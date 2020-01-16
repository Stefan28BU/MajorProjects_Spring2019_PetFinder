package petfinder.site.endpoint;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import petfinder.site.common.Notification.NotificationDao;
import petfinder.site.common.Notification.NotificationDto;
import petfinder.site.common.booking.BookingDto;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.*;
import petfinder.site.common.user.UserService.RegistrationRequest;

import javax.annotation.RegEx;
import javax.validation.constraints.Null;

/**
 * This is a controller endpoint which is intended to manage users and their association with pets. Because the class
 * is annotated with @RestController Spring will automatically take care of the creation of this class... we will never do
 * something like <code>UserEndpoint endpoint = new UserEndpoint()</code> in our code because this would break the Sping lifecycle.
 *
 * @RestController is like @Service, but implies a few additional attributes - it wires up with controller with Spring MVC so that
 * the @GetMapping and @PostMapping annotations work properly. If you had just used @Service here, those annotations would not have
 * any effect and our controller would not work like we anticipate. Additionally, @RestController differs from @Controller in that it
 * expects to receive and return JSON payloads at each of the endpoints. If we had just used @Controller here we would have to annotate our
 * function parameters and return types with @RequestBody and @ResponseBody respectively. @RestController annotation, then, is simply a convenience
 * which makes these additional annotations unnecessary.
 *
 * The typical Spring architecture is for Controllers to call down into Services, which then call into other Services or Daos. We'll talk more about
 * Services and Daos in other classes.
 */
@RestController
@RequestMapping(value = "/api/user")
public class UserEndpoint {
	/**
	 * @Autowired directs spring to set this field when creating the singleton instance of UserEndpoint. If you are familiar with Java but not Spring,
	 * you may wonder how this field is non-null because it doesn't get set equal to anything in the codebase. When Spring creates the singleton instance of
	 * UserEndpoint it looks in the Spring context for a singleton instance of UserService because of this @Autowired annotation and then sets that field appropriately.
	 * The UserService instances are created by the @Service annotation. Look inside of UserService for more information on how this works.
	 *
	 * The autowiring happens by type. If there are multiple of that type in the Spring context (this would be multiple instances of UserService in this case) then
	 * the application will fail to start - Spring will report that it cannot find a unique bean of type UserService. If you need to solve this, you can annotate one of those
	 * services with @Primary or you can @Autowire a list of elements.
	 */
	@Autowired
	private UserService userService;

	/**
	 * This @GetMapping annotation binds the below function to a GET HTTP request. Whenever the /api/user url is hit, the below function will be invoked. This is because
	 * the method level @GetMapping annotation inherits a root path from the class level @ReuestMapping annotation on UserEndpoint. The return type of UserDto will be
	 * serialized to a JSON representation via Jackson, a Java JSON marshalling library that Spring uses under the covers. You can hit this endpoint yourself in Postman, but
	 * will need to pass an authentication header as well. You can see how this is done by the application by opening up the network tab in the browser when you log in.
	 *
	 * Note: If you're wondering about what Optional is here, this is a Java utility for null saftey in that it forces the programmer to check the nullability of a value before
	 * accessing that value itself in an attempt to prevent occurence of NullPointerExceptions. In this case, it is possible that the user we want to get the details of does not exist.
	 * In this case, we would return Optional.empty() to signify that it is a null result. If you want to read more about Optional, see: https://www.baeldung.com/java-optional
	 */
	@GetMapping(value = "", produces = "application/json")
	public Optional<UserDto> getUserDetails() {
		// This line gets the "principal" of the currently logged in user - Spring sets this value for us based on the authentication header that is passed with the request
		// In this case "principal" refers to the email address of the user
		System.out.println("getting profile");
		String principal = SecurityContextHolder.getContext().getAuthentication().getName();

		// Then, we simply look up that user by their email address in Elasticsearch
		return userService.findUserByPrincipal(principal);
	}

	/**
	 * The @PostMapping annotation is very similar to the @GetMapping annotation except that it expects HTTP POST requests instead of GET request. Because of this, a post can
	 * accept a payload of data in its post body. You can almost think of a GET call as a function which takes no parameters, while a POST call is a function that takes a paramter
	 * via the POST body. In this case, the body of the request is JSON that is serialized via Jackson into a RegistrationRequest Java object. The application calls this when you
	 * register as a new user.
	 *
	 * In this function, we take a RegistrationRequest which includes a username, password, and map of additional attributes and we persist a new user in ElasticSearch. Then, we
	 * return that new user back to the frontend as a JSON payload - represented by the UserDto class here as the return type.
	 */
	@PostMapping(value = "/register")
	public UserDto register(@RequestBody RegistrationRequest request) {
		System.out.println(request.getGender());
		System.out.println(request.getFirstName());
		System.out.println(request.getUserType());
		System.out.println(request.getSecurityAnswer());
		return userService.register(request);
	}

	/**
	 * In this function, a update request is received and the current user profile is updated and returned
	 * @param request
	 * @return the updated user profile
	 */

	@PostMapping(value = "/editProfile")
	public UserDto editProfile(@RequestBody UpdateRequest request) {
		System.out.println(request.getFirstName());
		return userService.update(request);
	}
	/**
	 * This endpoint gets a list of pets associated with the current user. In this example we associate users and pets via a seperate index represented by the UserPetDto class.
	 * While this is one way to model this association, it is not the only way - pets could be included directly on the user object, for example. However, we have chosen to use a
	 * "mapping index" as an example of how to associate two indexes and relate them together. UserPetDto is a document which simply references the corresponding user id and pet id and associates them together.
	 *
	 * You can find the meat of this method in UserDao.findPets(...) - its here we call out to Elasticsearch and manually join the various indexes together.
	 */
	@GetMapping(value = "/pet")
	public List<PetDto> getPets() {
		//TODO: not checked
		String principal = SecurityContextHolder.getContext().getAuthentication().getName();
		UserDto user = userService.findUserByPrincipal(principal).get();
		System.out.println(user.getPrincipal());
		return userService.findPets(user);
	}

	/**
	 * This endpoint associates a new pet with the current user. The pet itself must be created prior to calling this endpoint via PetEndpoint.savePet(...)
	 */
	@PostMapping(value = "/pet")
	public UserPetDto addPetUser(@RequestBody UserPetDto userPetDto) {
		System.out.println(userPetDto.getPetId());
		System.out.println(userPetDto.getUserPrincipal());
		return userService.save(userPetDto);
	}

	/**
	 * This endpoint checks if a user principal exists, since it does not requires a access token,
	 * The return value is limited to be only boolean strings
	 * @param principal
	 * @return if the email exists
	 */

	@PostMapping(value = "/check")
	public String checkEmail(@RequestBody String principal) {
		Boolean res = userService.checkEmailExist(principal);
		if (res) {
			return "found";
		}
		else {
			return "not";
		}
	}

	/**
	 * This endpoint returns the security question of a user, it only returns the question and also does not
	 * requires access token.
	 * @param principal
	 * @return question
	 */
	@PostMapping(value = "/getQuestion")
	public String getQuestion(@RequestBody String principal) {
		String res = userService.getQuestion(principal);
		if (res != null) {
			return res;
		}
		else {
			return "no question is set for this user";
		}
	}

	/**
	 * takes the new password, user principal, and the answer, only return the result of reset/
	 * @param upr
	 * @return if the pass
	 */
	@PostMapping(value = "/checkAnswer")
	public String checkAnswer(@RequestBody UserService.UpdatePasswordRequest upr) {
		Boolean res = userService.checkAnswer(upr.getAnswer(), upr.getPrincipal(), upr.getNewPassword());
		if (res) {
			return "correct";
		}
		else {
			return "not";
		}
	}

	/**
	 * this endpoint returns a random question of the question set
	 * @return quesiton
	 */

	@GetMapping(value = "/getQuestion")
	public String getRandomQuestion() {
		return userService.getRandQuestion();
	}

	/**
	 * this endpoint returns the booking created by a user
	 * @return bookingdto
	 */
	@GetMapping(value = "/userBooking")
	public List<BookingDto> getUserBookings() {
		System.out.println("Calling end point user booking");
		String principal = SecurityContextHolder.getContext().getAuthentication().getName();
		UserDto user = userService.findUserByPrincipal(principal).get();
		return userService.findBookings(user);
	}


	/**
	 * This endpoint returns all notifications of a user
	 * @param id
	 * @return
	 */
	@GetMapping(value = "/userNotifications{id:.+}", produces = "application/json")
	public List<NotificationDto> getUserNotifications(@PathVariable("id") String id) {
		System.out.println("Calling end point user notis");
		Optional<UserDto> user = userService.findUserByPrincipal(id);
		UserDto user1 = new UserDto("dummy");
		if (user.isPresent()) {
			user1 = user.get();
		}
		return userService.findNotifications(user1);
	}
}