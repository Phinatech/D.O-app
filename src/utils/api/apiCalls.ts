import axios from "./axios";
import { agentData, userData, agentInfo } from "../../types";

const URL = "https://dirty-online.onrender.com";

export const createUser = async ({
  name,
  email,
  phoneNumber,
  address,
  password,
  stationName,
}: any) => {
  return await axios
    .post(`${URL}/api/users/registeruser`, {
      name,
      email,
      phoneNumber,
      address,
      password,
      stationName,
    })
    .then((res) => {
      return res.data;
    });
};
export const createDirectorStations = async (
  { email, phoneNumber, address, password, station }: agentData,
  id: any
) => {
  return await axios
    .post(`${URL}/api/director/new-station/${id}`, {
      email,
      phoneNumber,
      address,
      password,
      station,
    })
    .then((res) => {
      return res.data;
    });
};

const loginDirector = async ({ email, name }: any) => {
  return await axios
    .post(`${URL}/api/director/login-director`, { email, name })
    .then((res) => {
      return res.data;
    });
};
const loginUser = async ({ email, password }: any) => {
  return await axios
    .post(`${URL}/api/users/loginuser`, { email, password })
    .then((res) => {
      return res.data;
    });
};

const AllUsers = async () => {};

const allStations = async ({ id }: any) => {
  return await axios.get(`${URL}/api/stations/${id}`).then((res) => res.data);
};

const registerCarrier = async ({ name, phoneNumber, address }: any) => {
  return await axios
    .post(`${URL}/registermalam/`, { name, phoneNumber, address })
    .then((res) => {
      // return res.data;
      console.log(res.data);
    });
};

// const makeRequest = async ({ user, station }: any) => {
//   try {
//     const res = await axios.patch(
//       `${URL}/api/users/make-request/${user}/${station}`
//     );
//     // const newNumberOfRequests = res.data.RequestData.numberOfRequests;
//     // const usser = useAppSelector((state) => state.userDetails);
//     // const updatedUser: any = {
//     //   ...usser,
//     //   numberOfRequests: newNumberOfRequests,
//     // };
//     // dispatch an action to update the user state in Redux
//     // dispatch(updateUser(updatedUser));
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

const makeRequest = async ({ user, station }: any) => {
  return await axios
    .patch(`${URL}/api/users/make-request/${user}/${station}`)
    .then((res: any) => {
      console.log(res.data);

      // return res.data;
    })
    .catch((err) => {
      return err;
    });
};
export { AllUsers, allStations, loginUser, makeRequest, loginDirector };
