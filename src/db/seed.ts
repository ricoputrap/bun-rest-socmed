import { EnumPostMood, EnumPostPrivacy, PostInput } from "../domain/post/post-entity";
import PostService from "../domain/post/post-service";
import { UserInput } from "../domain/user/user-entity";
import UserService from "../domain/user/user-service";

const userInputs: UserInput[] = [
  {
    name: "John Doe",
    username: "johndoe123",
    email: "john@example.com",
    password: "password123"
  },
  {
    name: "Alice Smith",
    username: "alice_smith",
    email: "alice@example.com",
    password: "alice123"
  },
  {
    name: "Bob Johnson",
    username: "bobjohn",
    email: "bob@example.com",
    password: "bob123"
  },
  {
    name: "Emily Davis",
    username: "emily_d",
    email: "emily@example.com",
    password: "emily123"
  },
  {
    name: "Michael Wilson",
    username: "michael_w",
    email: "michael@example.com",
    password: "michael123"
  }
];

// Sample PostInput objects as an array with associated interests
const postInputs: PostInput[] = [
  // User 1: frontend software engineer
  {
    content: "Experimenting with responsive design techniques...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 1
  },
  {
    content: "Sharing tips for optimizing website performance...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 1
  },
  // User 2: backend software engineer
  {
    content: "Implementing RESTful APIs for our services...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 2
  },
  {
    content: "Troubleshooting server errors in the backend...",
    mood: EnumPostMood.SAD,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 2
  },
  // User 3: devops engineer
  {
    content: "Scripting automated deployment pipelines...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 3
  },
  {
    content: "Dealing with infrastructure scaling challenges...",
    mood: EnumPostMood.SAD,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 3
  },
  // User 4: product manager
  {
    content: "Conducting market research for product planning...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 4
  },
  {
    content: "Leading team brainstorming sessions for new features...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 4
  },
  // User 5: UI/UX designer
  {
    content: "Exploring new design trends and inspirations...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 5
  },
  {
    content: "Presenting user interface prototypes for feedback...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 5
  },
  // User 1: frontend software engineer
  {
    content: "Attending a frontend development conference...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 1
  },
  {
    content: "Exploring new JavaScript libraries for UI enhancements...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 1
  },
  // User 2: backend software engineer
  {
    content: "Learning about microservices architecture...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 2
  },
  {
    content: "Debugging performance issues in the backend code...",
    mood: EnumPostMood.SAD,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 2
  },
  // User 3: devops engineer
  {
    content: "Deploying a new containerized application...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 3
  },
  {
    content: "Investigating security vulnerabilities in the infrastructure...",
    mood: EnumPostMood.SAD,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 3
  },
  // User 4: product manager
  {
    content: "Creating user personas for product design...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 4
  },
  {
    content: "Analyzing competitor products for market positioning...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 4
  },
  // User 5: UI/UX designer
  {
    content: "Collaborating with developers on design implementation...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 5
  },
  {
    content: "Exploring color palettes for a new project...",
    mood: EnumPostMood.HAPPY,
    privacy: EnumPostPrivacy.PUBLIC,
    user_id: 5
  }
];

const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

const seeding = async () => {
  console.log("Seeding database...");

  const userSevice = new UserService();
  const postService = new PostService();

  console.log("Creating users data...");
  for (const user of userInputs) {
    const userID = await userSevice.create(user);
    console.log("New user is created with ID:", userID);
    
    await wait(1000);
  }

  console.log("Creating posts data...");
  for (const post of postInputs) {
    const postID = await postService.create(post);
    console.log("New post is created with ID:", postID);

    await wait(1000);
  }

  console.log("Done seeding database!");
}

seeding();