package petfinder.site.test.unit;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import petfinder.site.common.pet.PetDto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

public class PetDtoTest {

    PetDto pet = null;

    @BeforeEach
    void init() {
        this.pet = new PetDto("Rufus", "Hamster", "hungry");
    }

    @Test
    public void testPetDTO() {

        String newPref = "stuffed";

        this.pet.setPreference(newPref);

        assertEquals(newPref, this.pet.getPreference());
    }

    @Test
    public void testPetId() {
        PetDto pet1 = new PetDto();
        PetDto pet2 = new PetDto();
        assertNotEquals(pet1.getId(), pet2.getId());
    }


	/*@Autowired
	private PetDao petDAO;

	@Test
	@Transactional
	@Rollback(true)
	public void testAddPet() {

		PetDto pet = new PetDto("Rufus", "Hamster", "hungry");

		petDAO.save(pet);

		Optional<PetDto> optPet = petDAO.findPet(pet.getId());

		// pet was not saved properly
		if(!optPet.isPresent()) {
			fail();
		}

        // unwrap pet
		PetDto returnedPet = optPet.get();


		assertEquals(pet.getName(), returnedPet.getName());
		assertEquals(pet.getType(), returnedPet.getType());
		assertEquals(pet.getPreference(), returnedPet.getPreference());
		assertEquals(pet.getId(), returnedPet.getId());
	}
	*/
}
