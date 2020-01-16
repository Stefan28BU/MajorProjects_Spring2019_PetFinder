package petfinder.site.common.pet;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petfinder.site.common.user.UserPetDto;

/**
 * If this is your first time looking at Spring Services, check out the detailed explanation in UserService first.
 *
 * This is the service responsible for saving and retrieving pets which are in Elasticsearch.
 */
@Service
public class PetService {
	@Autowired
	private PetDao petDao;

	public Optional<PetDto> findPet(String id) {
		return petDao.findPet(id);
	}

	public PetDto save(PetDto pet) {
		petDao.save(pet);
		return pet;
	}

	public void deletePet(PetDto petDto) {
		petDao.deletePet(petDto.getId());
//		petDao.deletePet(userPetDto.getPetId());
	}

	/**
	 * update a pet
	 * @param pet
	 * @return
	 */
	public PetDto update(PetDto pet) {
		PetDto temp = null;
		System.out.println(pet.getId());

		Optional<PetDto> u = petDao.findPet(pet.getId());
		if(!u.isPresent()) {
			System.out.println("cant find it");

		}
		if (u.isPresent()) {
			temp = u.get();
			temp.setName(pet.getName());
			temp.setType(pet.getType());
			temp.setPreference(pet.getPreference());
			System.out.println(temp.getName());

			petDao.save(temp);
		}

		return temp;
	}

	/*public static class AddPetRequest {
		private String petName;
		private String type;

		public String getPetName() {
			return petName;
		}

		public void setPetName(String petName) {
			this.petName = petName;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

	}*/

}