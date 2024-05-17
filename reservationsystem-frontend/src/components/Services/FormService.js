import axios from 'axios';
import Configurations from "../../Configurations.json"

const FormService_API_BASE_URL_Save = `${Configurations.api_service}/reservations`;

const FormService_API_BASE_URL_GET_Liquid_Chemical =`${Configurations.api_service}/chemicals/liquids`;
const FormService_API_BASE_URL_POST_Liquid_Chemical_Names =`${Configurations.api_service}/chemicals/liquids`;

const FormService_API_BASE_URL_Solid_Chemical_Names =`${Configurations.api_service}/chemicals/solids`;
const FormService_API_BASE_URL_POST_Solid_Chemical =`${Configurations.api_service}/chemicals/solids`;

const FormService_API_BASE_URL_Lab_Equipment_Names = `${Configurations.api_service}/labequipments`;
const FormService_API_BASE_URL_POST_Lab_Equipments = `${Configurations.api_service}/labequipments`;

const FormService_API_BASE_URL_Get_Reservation_Details = `${Configurations.api_service}/reservations/all`;
const FormService_API_BASE_URL_Get_Reservation = `${Configurations.api_service}/reservations`

const UserRegister = `${Configurations.api_service}/users/register`
const PatchUserDetails = `${Configurations.api_service}/users`
const GetUsersDetails = `${Configurations.api_service}/users/usersDetails`


const submitReservation = async (formDatax) => {
  try {
    const response = await axios.post(FormService_API_BASE_URL_Save, formDatax, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const getSolidChemicalNames = async () => {
  return axios.get(FormService_API_BASE_URL_Solid_Chemical_Names);
};

const getReservationHistory = async () => {
  return axios.get(FormService_API_BASE_URL_Get_Reservation);
}


const getLabEquipmentNames = async () => {
  return axios.get(FormService_API_BASE_URL_Lab_Equipment_Names);
};

const getLiquidChemicalNames = async () => {
  return axios.get(FormService_API_BASE_URL_GET_Liquid_Chemical);
};

const patchUserDetails = async () => {
  return axios.put(PatchUserDetails);
}

const getUsersDetails = async () => {
  return axios.get(GetUsersDetails);
}

const createUser = async (formData) => {
  try {
    const response = await axios.post(UserRegister, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const postSolidChemical = async (formData) => {
  try {
    const response = await axios.post(FormService_API_BASE_URL_POST_Solid_Chemical, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const postLiquidChemical = async (formData) => {
  try {
    const response = await axios.post(FormService_API_BASE_URL_POST_Liquid_Chemical_Names, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const postLabEquipment = async (formData) => {
  try {
    const response = await axios.post(FormService_API_BASE_URL_POST_Lab_Equipments, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}



export default { postLabEquipment,postLiquidChemical, postSolidChemical, getUsersDetails,createUser,patchUserDetails,getReservationHistory, getSolidChemicalNames, getLabEquipmentNames, getLiquidChemicalNames, submitReservation };
