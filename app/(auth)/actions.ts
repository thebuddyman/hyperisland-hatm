// 'use server';

// import { z } from 'zod';

// import { createUser, getUser } from '@/lib/db/queries';

// import { signIn } from './auth';

// const authFormSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
// });

// export interface LoginActionState {
//   status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data';
// }

// export const login = async (
//   _: LoginActionState,
//   formData: FormData,
// ): Promise<LoginActionState> => {
//   try {
//     const validatedData = authFormSchema.parse({
//       email: formData.get('email'),
//       password: formData.get('password'),
//     });

//     await signIn('credentials', {
//       email: validatedData.email,
//       password: validatedData.password,
//       redirect: false,
//     });

//     return { status: 'success' };
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return { status: 'invalid_data' };
//     }

//     return { status: 'failed' };
//   }
// };

// export interface RegisterActionState {
//   status:
//     | 'idle'
//     | 'in_progress'
//     | 'success'
//     | 'failed'
//     | 'user_exists'
//     | 'invalid_data';
// }

// export const register = async (
//   _: RegisterActionState,
//   formData: FormData,
// ): Promise<RegisterActionState> => {
//   try {
//     const validatedData = authFormSchema.parse({
//       email: formData.get('email'),
//       password: formData.get('password'),
//     });

//     const [user] = await getUser(validatedData.email);

//     if (user) {
//       return { status: 'user_exists' } as RegisterActionState;
//     }
//     await createUser(validatedData.email, validatedData.password);
//     await signIn('credentials', {
//       email: validatedData.email,
//       password: validatedData.password,
//       redirect: false,
//     });

//     return { status: 'success' };
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return { status: 'invalid_data' };
//     }

//     return { status: 'failed' };
//   }
// };


'use server';

import { z } from 'zod';

import { createUser, getUser } from '@/lib/db/queries';
import { createFirstTimeChat } from '@/app/(chat)/actions';
import { signIn } from './auth';

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export interface LoginActionState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data';
}

export const login = async (
  _: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};

export interface RegisterActionState {
  status:
    | 'idle'
    | 'in_progress'
    | 'success'
    | 'failed'
    | 'user_exists'
    | 'invalid_data';
  chatId?: string;  // Added to handle the welcome chat ID
}

export const register = async (
  _: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const [existingUser] = await getUser(validatedData.email);

    if (existingUser) {
      return { status: 'user_exists' };
    }

    // Create the new user
    await createUser(validatedData.email, validatedData.password);

    // Get the newly created user to get their ID
    const [newUser] = await getUser(validatedData.email);
    
    if (!newUser) {
      return { status: 'failed' };
    }

    // Create the welcome chat
    const chatId = await createFirstTimeChat({ userId: newUser.id });

    // Sign in the user
    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    // Return success with the chat ID for redirection
    return { 
      status: 'success',
      chatId 
    };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};