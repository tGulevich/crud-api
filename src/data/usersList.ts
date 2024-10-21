import { v4 as uuidv4 } from "uuid";
import { User } from "../types/user";

export const usersList: User[] = [
  {
    id: uuidv4(),
    username: "SunnyBunny",
    age: 30,
    hobbies: ["photography", "hiking"],
  },
  {
    id: uuidv4(),
    username: "Alexa",
    age: 15,
    hobbies: ["reading", "gaming"],
  },
  {
    id: uuidv4(),
    username: "Storm Chaser",
    age: 22,
    hobbies: ["sports"],
  },
  {
    id: uuidv4(),
    username: "Tom",
    age: 28,
    hobbies: ["dance", "photography"],
  },
  {
    id: uuidv4(),
    username: "Alice C",
    age: 27,
    hobbies: ["music"],
  },
];
