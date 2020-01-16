package petfinder.site.common.user;

import java.util.UUID;

import alloy.util.Identifiable;

public class UserPetDto implements Identifiable {

	private Long id;
	private String userPrincipal;
	private String petId;

	public UserPetDto() {
		id = UUID.randomUUID().getMostSignificantBits();
	}

	public UserPetDto(String userPrincipal, String petId) {
		id = UUID.randomUUID().getMostSignificantBits();
		this.userPrincipal = userPrincipal;
		this.petId = petId;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserPrincipal() {
		return userPrincipal;
	}

	public void setUserPrincipal(String userPrincipal) {
		this.userPrincipal = userPrincipal;
	}

	public String getPetId() {
		return petId;
	}

	public void setPetId(String petId) {
		this.petId = petId;
	}
}