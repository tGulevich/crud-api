import { v4 as uuidv4 } from "uuid";
import { usersList } from "./data/usersList";
import { User } from "./types/user";

const getUsersList = () => usersList;

const getUserById = (id: string) => {
  return usersList.find((user) => {
    return user.id === id;
  });
};

const createUser = (username: string, age: number, hobbies: string[]) => {
  const newUser: User = { id: uuidv4(), username, age, hobbies };
  usersList.push(newUser);
  return newUser;
};
const updateUser = (id: string, updatedData: Partial<User>) => {
  const userIndex = usersList.findIndex((user) => user.id === id);
  if (userIndex >= 0) {
    usersList[userIndex] = { ...usersList[userIndex], ...updatedData };
    return usersList[userIndex];
  }
  return null;
};
const deleteUser = (id: string) => {
  const userIndex = usersList.findIndex((user) => user.id === id);
  if (userIndex >= 0) {
    usersList.splice(userIndex, 1);
    return true;
  }
  return false;
};

export { getUsersList, getUserById, createUser, updateUser, deleteUser };
