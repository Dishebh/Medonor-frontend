//----------------BLOGS---------------------------------//
import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const addMedicine = (medicine) => ({
	type: ActionTypes.ADD_MEDICINE,
	payload: medicine,
});

export const postMedicine = (medicine) => (dispatch) => {
	const newMedicine = medicine;
	newMedicine.dateNum = Date.now();
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "medicines", {
		method: "POST",
		body: JSON.stringify(newMedicine),
		headers: {
			"Content-Type": "application/json",
			Authorization: bearer,
		},
		//credentials: "same-origin"
	})
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					var error = new Error(
						"Error " + response.status + ": " + response.statusText
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				throw error;
			}
		)
		.then((response) => response.json())
		.then((response) => dispatch(addMedicine(response)))
		.catch((error) => {
			console.log("post medicines", error.message);
			alert("Your medicine could not be posted\nError: " + error.message);
		});
};

export const fetchMedicines = () => (dispatch) => {
	dispatch(medicinesLoading(true));

	return fetch(baseUrl + "medicines")
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					var error = new Error(
						"Error " + response.status + ": " + response.statusText
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				var errmess = new Error(error.message);
				throw errmess;
			}
		)
		.then((response) => response.json())
		.then((medicines) => dispatch(addMedicines(medicines)))
		.catch((error) => dispatch(medicinesFailed(error.message)));
};


export const deleteMedicine = (medicineId) => (dispatch) => {
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "medicines/" + medicineId, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: bearer,
		},
        //credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(() => dispatch(removeMedicine(medicineId)))
	.then(() => console.log('Medicine deleted!!'))
    .catch(error => dispatch(medicinesFailed(error.message)));
};

export const removeMedicine = (medicineId) => ({
	type: ActionTypes.DELETE_MEDICINE,
	payload: medicineId,
});

export const medicinesLoading = () => ({
	type: ActionTypes.MEDICINES_LOADING,
});

export const medicinesFailed = (errmess) => ({
	type: ActionTypes.MEDICINES_FAILED,
	payload: errmess,
});

export const addMedicines = (medicines) => ({
	type: ActionTypes.ADD_MEDICINES,
	payload: medicines,
});