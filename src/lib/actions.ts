import { z } from 'zod';

// Schema for fetching a user's repositories.
const fetchUserReposSchema = z.object({
  username: z.string().min(1, { message: 'Username is required.' }),
});

export async function fetchUserRepos(formData: FormData) {
  // Validate form data
  const validatedFields = fetchUserReposSchema.safeParse({
    username: formData.get('username'),
  });

  if (!validatedFields.success) {
    return {
      error: true,
      message: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username } = validatedFields.data;

  // Fetch the user's repos from GitHub
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );

  // Handle specific 404 response (user not found)
  if (response.status === 404) {
    return { error: true, message: 'User not found' };
  }

  if (!response.ok) {
    return { error: true, message: 'Error fetching repositories from GitHub' };
  }

  const repos = await response.json();

  // Handle case where no repositories are found
  if (Array.isArray(repos) && repos.length === 0) {
    return { error: true, message: 'No repositories found for that username.' };
  }

  return { error: false, repos };
}

// Schema for fetching a repository's README.
const fetchRepoReadmeSchema = z.object({
  username: z.string().min(1, { message: 'Username is required.' }),
  repoName: z.string().min(1, { message: 'Repository name is required.' }),
});

export async function fetchRepoReadmeByParams(
  username: string,
  repoName: string
) {
  // Validate the input parameters.
  const validatedFields = fetchRepoReadmeSchema.safeParse({
    username,
    repoName,
  });
  if (!validatedFields.success) {
    return {
      error: true,
      message: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username: validUsername, repoName: validRepoName } =
    validatedFields.data;

  // Fetch the repository's README from GitHub.
  const response = await fetch(
    `https://api.github.com/repos/${validUsername}/${validRepoName}/readme`
  );

  // Handle a 404 (Not Found) response.
  if (response.status === 404) {
    return {
      error: true,
      message: 'Repository not found or no README available',
    };
  }

  if (!response.ok) {
    return {
      error: true,
      message: 'Error fetching repository README from GitHub',
    };
  }

  const json = await response.json();

  if (!json.content) {
    return {
      error: true,
      message: 'No README content found for this repository.',
    };
  }

  // Decode the base64 encoded README content.
  const decodedContent = Buffer.from(json.content, 'base64').toString('utf-8');
  return { error: false, readme: decodedContent };
}
