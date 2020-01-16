package petfinder.site.common.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.codehaus.jackson.annotate.JsonIgnore;

import alloy.util.Identifiable;
import alloy.util.Momento;
import petfinder.site.common.pet.PetDto;

/**
 * contains the new updated object from frontend
 */
public class UpdateRequest {
    private String principal;
    private List<String> roles;
    private UserDto.UserType type;
    private Map<String, Object> attributes;
    private String myNewField;
    private String firstName;
    private String lastName;
    private String gender;
    private String zipcode;

    private UpdateRequest() {

    }

    public UpdateRequest(String principal, List<String> roles, String firstName, String lastName, String gender, String zipcode, UserDto.UserType type, Map<String, Object> attributes) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.zipcode = zipcode;
        this.principal = principal;
        this.roles = roles;
        this.attributes = attributes;
        this.type = type;
    }

    public String getPrincipal() {
        return principal;
    }

    public void setPrincipal(String principal) {
        this.principal = principal;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public UserDto.UserType getType() {
        return type;
    }

    public void setType(UserDto.UserType type) {
        this.type = type;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public String getMyNewField() {
        return myNewField;
    }

    public void setMyNewField(String myNewField) {
        this.myNewField = myNewField;
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


}