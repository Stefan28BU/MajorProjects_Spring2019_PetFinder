package petfinder.site.common.user;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import alloy.util.Identifiable;
import alloy.util.Momento;
import petfinder.site.common.pet.PetDto;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class UserDto implements Momento<String> {
	private String principal;
	private List<String> roles;
	private UserType type;

	private Map<String, Object> attributes;
	private String myNewField;
	private String firstName;
	private String lastName;
	private int score;
	private Date lastCheckDate;

	public String getSecurtyQuestion() {
		return securtyQuestion;
	}

	public void setSecurtyQuestion(String securtyQuestion) {
		this.securtyQuestion = securtyQuestion;
	}

	private String securtyQuestion;
	private String securityAnswer;

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	/**
	 * increase the score
	 */
	public void promot() {
		if (this.score < 100) {
			score++;
		}
	}

	public String getSecurityAnswer() {
		return securityAnswer;
	}

	public void setSecurityAnswer(String securityAnswer) {
		this.securityAnswer = securityAnswer;
	}

	public void panelty() {
		score--;
	}

	public void setPrincipal(String principal) {
		this.principal = principal;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public void setType(UserType type) {
		if (this.type != null){
			if (this.type == UserType.OWNER && type == UserType.SITTER) {
				this.type = UserType.BOTH;
			}
			if (this.type == UserType.SITTER && type == UserType.OWNER) {
				this.type = UserType.BOTH;
			}
		}
		else {
			this.type = type;
		}
	}

	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getGender() {
		return gender;
	}

	public String getZipcode() {
		return zipcode;
	}

	public Date getLastCheckDate() {
		return lastCheckDate;
	}

	public void setLastCheckDate(Date lastCheckDate) {
		this.lastCheckDate = lastCheckDate;
	}

	private String gender;
	private String zipcode;

	/**
	 * setting the check time default to the epoch
	 */
	private UserDto() {
		String firstDay = "01/01/1970";
		try {
			this.lastCheckDate = new SimpleDateFormat("dd/MM/yyyy").parse(firstDay);
		}catch (ParseException e) {
			System.out.println("some issue");
		}
		this.score = 2;
	}

	public UserDto(String principal, List<String> roles, String firstName,
				   String lastName, String gender, String zipcode, UserType type,
				   Map<String, Object> attributes, String securityAnswer, String securtyQuestion) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.zipcode = zipcode;
		this.principal = principal;
		this.roles = roles;
		this.attributes = attributes;
		this.type = type;
		this.score = 2;
		this.securityAnswer = securityAnswer;
		this.securtyQuestion = securtyQuestion;
		String firstDay = "01/01/1970";
		try {
			this.lastCheckDate = new SimpleDateFormat("dd/MM/yyyy").parse(firstDay);
		}catch (ParseException e) {
			System.out.println("some issue");
		}
	}

	public UserDto(String principal) {
		this.principal = principal;
	}

	public String getPrincipal() {
		return principal;
	}

	public List<String> getRoles() {
		return roles;
	}

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public UserType getType() {
		return type;
	}

	public String getMyNewField() {
		return myNewField;
	}

	public void setMyNewField(String myNewField) {
		this.myNewField = myNewField;
	}

	@JsonIgnore
	@Override
	public String getMomento() {
		return principal;
	}

	public enum UserType {
		OWNER, SITTER, BOTH
	}
}