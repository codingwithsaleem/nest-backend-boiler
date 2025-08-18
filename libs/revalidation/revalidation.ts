/**
 * Triggers revalidation for a given path.
 *
 * This function initiates a revalidation process for the specified path.
 * It is an asynchronous function and returns a promise that resolves when
 * the revalidation is complete.
 * @param path - The path to revalidate.
 */
export async function triggerRevalidation(path: string): Promise<void> {
  // const revalidateUrl = `http://localhost:3000/api/revalidate?path=${path}`;
  const revalidateUrl = `${process.env.FRONTEND_URL}/api/revalidate?path=${path}`;

  try {
    const response = await fetch(revalidateUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Revalidation response:', await response.json());

    if (!response.ok) {
      console.error(`Revalidation failed: ${response.statusText}`);
    } else {
      console.log('Revalidation triggered successfully', path);
    }
  } catch (error) {
    console.error('Error triggering revalidation:', error);
  }
}
/**
 * Triggers revalidation for a given tag.
 *
 * This function initiates a revalidation process for the specified tag.
 * It is an asynchronous function and returns a promise that resolves when
 * the revalidation is complete.
 * @param tag - The tag to revalidate.
 */
export async function triggerRevalidationTag(tag: string): Promise<void> {
  // const revalidateUrl = `http://localhost:3000/api/revalidate?tag=${tag}`;
  const revalidateUrl = `${process.env.FRONTEND_URL}/api/revalidate?tag=${tag}`;

  try {
    const response = await fetch(revalidateUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Revalidation response:', await response.json());

    if (!response.ok) {
      console.error(`Revalidation failed: ${response.statusText}`);
    } else {
      console.log('Revalidation triggered successfully', tag);
    }
  } catch (error) {
    console.error('Error triggering revalidation:', error);
  }
}
