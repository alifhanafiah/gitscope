'use server';

import { z } from 'zod';

// Schema for fetching a user's repositories.
const fetchUserReposSchema = z.object({
  username: z.string().min(1, { message: 'Username is required.' }),
});

export async function fetchUserRepos(formData: FormData) {
  // Validate form data by extracting the "username" field.
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

  // Call GitHub's API to get the user's repositories.
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  if (!response.ok) {
    return { error: true, message: 'Error fetching repositories from GitHub' };
  }

  const repos = await response.json();
  return { error: false, repos };
}

// Schema for fetching a repository's README.
const fetchRepoReadmeSchema = z.object({
  username: z.string().min(1, { message: 'Username is required.' }),
  repoName: z.string().min(1, { message: 'Repository name is required.' }),
});

export async function fetchRepoReadme(formData: FormData) {
  // Validate form data by extracting both "username" and "repoName".
  const validatedFields = fetchRepoReadmeSchema.safeParse({
    username: formData.get('username'),
    repoName: formData.get('repoName'),
  });

  if (!validatedFields.success) {
    return {
      error: true,
      message: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, repoName } = validatedFields.data;

  // Call GitHub's API to get the repository's README.
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/readme`
  );
  if (!response.ok) {
    return {
      error: true,
      message: 'Error fetching repository README from GitHub',
    };
  }

  const json = await response.json();

  // Decode the base64 encoded README content.
  const decodedContent = Buffer.from(json.content, 'base64').toString('utf-8');
  return { error: false, readme: decodedContent };
}
