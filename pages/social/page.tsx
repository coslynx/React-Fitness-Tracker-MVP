'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '../../lib/store';
import styles from './page.module.css';
import { useGoals } from '../../lib/goals';
import { Post, Comment, User } from '../../types';
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import PostForm from '../../components/PostForm';
import { useUser } from '../../lib/user';

export default function SocialPage() {
  const { data: session } = useSession();
  const { socialFeed, isLoading, fetchSocialFeed, createPost, updatePost } = useStore();
  const { user } = useUser();

  const [isCreatingPost, setIsCreatingPost] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetchSocialFeed(session.user.id);
    }
  }, [session]);

  const handlePostSubmit = async (newPost: Post) => {
    try {
      const response = await createPost(newPost);
      // Update socialFeed in the Zustand store (using useStore())
      // Reset post creation form
    } catch (error) {
      console.error('Error creating post:', error);
      // Display an appropriate error message to the user
    }
  };

  const handlePostInteraction = async (postId: string, interactionType: 'like' | 'comment', interactionData?: Comment) => {
    try {
      const updatedPost = await updatePost(postId, interactionType, interactionData);
      // Update the socialFeed state in the Zustand store
    } catch (error) {
      console.error('Error interacting with post:', error);
      // Display an appropriate error message to the user
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Social Feed</h1>

      {session && (
        <PostForm
          isCreatingPost={isCreatingPost}
          setIsCreatingPost={setIsCreatingPost}
          onSubmit={handlePostSubmit}
        />
      )}

      {isLoading && <div className={styles.loading}>Loading...</div>}
      {!isLoading && socialFeed.length === 0 && (
        <div className={styles.emptyFeed}>No posts yet. Start creating your posts!</div>
      )}
      {!isLoading && socialFeed.length > 0 && (
        <ul className={styles.feedList}>
          {socialFeed.map((post) => (
            <Post
              key={post.id}
              post={post}
              onLike={() => handlePostInteraction(post.id, 'like')}
              onComment={(comment) => handlePostInteraction(post.id, 'comment', comment)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}