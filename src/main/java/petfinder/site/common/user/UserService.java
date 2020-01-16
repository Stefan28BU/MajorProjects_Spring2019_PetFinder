package petfinder.site.common.user;

import java.time.Duration;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import alloy.util.AlloyAuthentication;
import alloy.util.Wait;
import alloy.util._Lists;
import alloy.util._Maps;
import petfinder.site.common.Notification.NotificationDto;
import petfinder.site.common.booking.BookingDto;
import petfinder.site.common.booking.BookingService;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.UserDto.UserType;

/**
 * Services are Spring concepts for classes which manage the application's buisness logic.
 */
@Service
public class UserService {
	@Autowired
	private UserDao userDao;


	@Autowired
	private PasswordEncoder passwordEncoder;

	/**
	 * return user info
	 * @param principal
	 * @return
	 */
	public Optional<UserDto> findUserByPrincipal(String principal) {
		return userDao.findUserByPrincipal(principal).map(UserAuthenticationDto::getUser);
	}

	/**
	 * return check if email exists
	 * @param principal
	 * @return
	 */
	public Boolean checkEmailExist(String principal) {
		// if exist, return true
		Optional<UserAuthenticationDto> temp = userDao.findUserByPrincipal(principal);
		if (temp.isPresent()) {
			return true;
		}
		return false;
	}

	/**
	 * return result of reseting password
	 * @param answer
	 * @param principal
	 * @param newPassword
	 * @return
	 */
	public Boolean checkAnswer(String answer, String principal, String newPassword) {
		// check the answer with the existed answer
		Optional<UserAuthenticationDto> temp = userDao.findUserByPrincipal(principal);
		if (temp.isPresent()) {
			if (temp.get().getUser().getSecurityAnswer().equals(answer)) {
				passwordUpdate(newPassword, temp.get());
				return true;
			}
			return false;
		}
		return false;

	}

	/**
	 * return the question
	 * @param principal
	 * @return
	 */
	public String getQuestion(String principal) {
		// default question is returned when the user has no question, which is weird
		Optional<UserAuthenticationDto> temp = userDao.findUserByPrincipal(principal);
		if (temp.isPresent()) {
			return temp.get().getUser().getSecurtyQuestion();
		}
		else {
			return null;
		}
	}

	/**
	 * return the new changed access token after reseting
	 * @param principal
	 * @return
	 */
	public Optional<UserAuthenticationDto> findUserAuthenticationByPrincipal(String principal) {
		return userDao.findUserByPrincipal(principal);
	}

	/**
	 * just for registration request to fit the json
	 */
	public static class RegistrationRequest {
		private String principal;
		private String password;
		private String firstName;
		private String lastName;
		private String userType;
		private String securityAnswer;
		private String securityQuestion;

		public String getSecurityQuestion() {
			return securityQuestion;
		}

		public void setSecurityQuestion(String securityQuestion) {
			this.securityQuestion = securityQuestion;
		}

		public void setUserType(String userType) {
			this.userType = userType;
		}


		public UserType getUserType() {
			if (userType.equalsIgnoreCase("owner")) {
				return UserType.OWNER;
			}
			else if(userType.equalsIgnoreCase("sitter")){
				return UserType.SITTER;
			}
			else  {
				return UserType.BOTH;
			}
		}

		public String getSecurityAnswer() {
			return securityAnswer;
		}

		public void setSecurityAnswer(String securityAnswer) {
			this.securityAnswer = securityAnswer;
		}
		public String getFirstName() {
			return firstName;
		}

		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}

		public String getLastName() {
			return lastName;
		}

		public void setLastName(String lastName) {
			this.lastName = lastName;
		}

		public String getGender() {
			return gender;
		}

		public void setGender(String gender) {
			this.gender = gender;
		}

		public String getZipcode() {
			return zipcode;
		}

		public void setZipcode(String zipcode) {
			this.zipcode = zipcode;
		}

		private String gender;
		private String zipcode;
		private Map<String, Object> attributes;

		public String getPrincipal() {
			return principal;
		}

		public void setPrincipal(String principal) {
			this.principal = principal;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public Map<String, Object> getAttributes() {
			return attributes;
		}

		public void setAttributes(Map<String, Object> attributes) {
			this.attributes = attributes;
		}
	}

	/**
	 * just for reset password to fit the json
	 */
	public static class UpdatePasswordRequest {
		private String principal;
		private String newPassword;
		private String answer;

		public UpdatePasswordRequest(String principal, String newPassword, String answer) {
			this.principal = principal;
			this.newPassword = newPassword;
			this.answer = answer;
		}

		public UpdatePasswordRequest() {
		}

		public String getPrincipal() {
			return principal;
		}

		public void setPrincipal(String principal) {
			this.principal = principal;
		}

		public String getNewPassword() {
			return newPassword;
		}

		public void setNewPassword(String newPassword) {
			this.newPassword = newPassword;
		}

		public String getAnswer() {
			return answer;
		}

		public void setAnswer(String answer) {
			this.answer = answer;
		}
	}

	/**
	 * register with security question & answer
	 * @param request
	 * @return
	 */
	public UserDto register(RegistrationRequest request) {
		UserAuthenticationDto userAuthentication = new UserAuthenticationDto(
				new UserDto(request.getPrincipal(), _Lists.list("ROLE_USER"),
						request.getFirstName(), request.getLastName(),
						request.getGender(), request.getZipcode(),
						request.getUserType(), request.getAttributes(), request.getSecurityAnswer(), request.getSecurityQuestion()),
				passwordEncoder.encode(request.getPassword()));
		userDao.save(userAuthentication);
		return userAuthentication.getUser();
	}

	/**
	 * encode the new password & return the new access token
	 * @param password
	 * @param userAuthenticationDto
	 * @return
	 */
	public UserDto passwordUpdate(String password, UserAuthenticationDto userAuthenticationDto) {
		UserDto u = null;
		userAuthenticationDto.setPassword(passwordEncoder.encode(password));
		u = userAuthenticationDto.getUser();
		userDao.save(userAuthenticationDto);
		return u;
	}

	/**
	 * save the user pet relationship
	 * @param userPetDto
	 * @return
	 */
	public UserPetDto save(UserPetDto userPetDto) {
		return userDao.save(userPetDto);
	}

	/**
	 * update the profile
	 * @param request
	 * @return
	 */
	public UserDto update(UpdateRequest request){
		UserDto u = null;
		UserAuthenticationDto userAuthentication = null;

		// Find the user corresponding to the given principal
		if(userDao.findUserByPrincipal(request.getPrincipal()).isPresent()){
			userAuthentication = userDao.findUserByPrincipal(request.getPrincipal()).get();

			// Make the changes to user's information
			u = userAuthentication.getUser();
			u.setFirstName(request.getFirstName());
			u.setLastName(request.getLastName());
			u.setGender(request.getGender());
			u.setZipcode(request.getZipcode());
			u.setType(request.getType());

			userDao.save(userAuthentication);
		}
		return u;
	}

	/**
	 * return all pets of a user
	 * @param user
	 * @return
	 */
	public List<PetDto> findPets(UserDto user) {
		return userDao.findPets(user);
	}

	/**
	 * return bookings of a user
	 * @param user
	 * @return
	 */
	public List<BookingDto> findBookings(UserDto user) {
		List<BookingDto> list = userDao.findBookings(user);
		/*
		 * parse the booking date to make display better
		 */
		for (BookingDto bookingDto: list) {
			bookingDto.setStartDate(bookingDto.getStartDate().substring(0, 10));
			bookingDto.setEndDate(bookingDto.getEndDate().substring(0, 10));
			bookingDto.setStartTime(bookingDto.getStartTime().substring(11, 19));
			bookingDto.setEndTime(bookingDto.getEndTime().substring(11, 19));
		}
		// sort by the date
		Collections.sort(list, new Comparator<BookingDto>() {
			@Override
			public int compare(BookingDto o1, BookingDto o2) {
				return o2.getCreateDate().compareTo(o1.getCreateDate());
			}
		});
		return list;
	}

	/**
	 * retun the notification of a user
	 * @param user
	 * @return
	 */
	public List<NotificationDto> findNotifications(UserDto user) {
		List<NotificationDto> list = userDao.findNotification(user);
		Collections.sort(list, new Comparator<NotificationDto>() {
			@Override
			public int compare(NotificationDto o1, NotificationDto o2) {
				return o2.getCreateDate().compareTo(o1.getCreateDate());
			}
		});
		return list;
	}

	/**
	 * return a random question when registering
	 * @return
	 */
	public String getRandQuestion() {
		List<String> stringList = new ArrayList<>();
		Random rand = new Random();
		stringList.add("What was your childhood nickname?");
		stringList.add("In what city or town did your mother and father meet?");
		stringList.add("What is your favorite Overwatch League team?");
		stringList.add("What was your favorite food as a child?");
		return stringList.get(rand.nextInt(stringList.size()));
	}
}