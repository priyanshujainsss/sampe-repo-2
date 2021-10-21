import axios from 'axios';
import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------
// const users = [...Array(9)].map((_, index) => ({
//   id: faker.datatype.uuid(),
//   avatarUrl: mockImgAvatar(index + 1),
//   name: faker.name.findName(),
//   company: faker.phone.phoneNumber(),
//   isVerified: faker.datatype.boolean(),
//   status: sample(['active', 'banned']),
//   role: sample([
//     'Leader',
//     'Hr Manager',
//     'UI Designer',
//     'UX Designer',
//     'UI/UX Designer',
//     'Project Manager'
//   ])
// }));
let alluser = [];
const getusers = async () => {
  const allusers = await axios.get('http://localhost:4000/getusers', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  const alldata = allusers.data;
  console.log(alldata);
  alluser = alldata;
  return alldata;
};
// getusers();
// console.log(alluser);
// const users = [...Array(9)].map((_, index) => ({
//   id: faker.datatype.uuid(),
//   avatarUrl: mockImgAvatar(index + 1),
//   name: faker.name.findName(),
//   company: faker.phone.phoneNumber(),
//   isVerified: faker.datatype.boolean(),
//   status: sample(['active', 'banned']),
//   role: sample([
//     'Leader',
//     'Hr Manager',
//     'UI Designer',
//     'UX Designer',
//     'UI/UX Designer',
//     'Project Manager'
//   ])
// }));
// const users = alluser.map((user, index) => ({
//   name: user.Fullname,
//   email: user.EmailId,
//   phone: user.Contact
// }));
// export default users;
export default getusers();
