import { Knex } from 'knex';

// admins
export const user1 = {
  id: 'be9f3579-f027-482f-a1d2-da613d68d1b6',
  first_name: 'Marek',
  last_name: 'Nowak',
  username: 'mareknowak',
  password: '$2a$10$iRZss/VgvQGlrblOqYfdEuUCNtJOlGymPiOp3iMGbpgtmfUnNlOi6', // pass
  email: 'marek@gmail.com',
};
export const user2 = {
  id: '41997aea-e1b4-4cc3-9e48-f235602b5ec7',
  first_name: 'Dawid',
  last_name: 'Kowalski',
  username: 'dawidkowalski',
  password: '$2a$10$iRZss/VgvQGlrblOqYfdEuUCNtJOlGymPiOp3iMGbpgtmfUnNlOi6', // pass
  email: 'dawid@gmail.com',
};
// participants / drivers
export const user3 = {
  id: 'b3ca38e7-bf2a-4ebf-9d29-45bca81a9af8',
  first_name: 'Tomek',
  last_name: 'Lewandowski',
  username: 'tomlew',
  password: '$2a$10$iRZss/VgvQGlrblOqYfdEuUCNtJOlGymPiOp3iMGbpgtmfUnNlOi6', // pass
  email: 'lewy123@wp.pl',
};
export const user4 = {
  id: 'd80da73b-c2ad-4c55-840f-7abac1ba0ae8',
  first_name: 'Leo',
  last_name: 'Messi',
  username: 'leomes',
  password: '$2a$10$iRZss/VgvQGlrblOqYfdEuUCNtJOlGymPiOp3iMGbpgtmfUnNlOi6', // pass
  email: 'leo@barca.es',
};
export const user5 = {
  id: '1531f93c-70d0-4854-a5cf-4e524338a889',
  first_name: 'Krystian',
  last_name: 'Ronaldo',
  username: 'krysnal',
  password: '$2a$10$iRZss/VgvQGlrblOqYfdEuUCNtJOlGymPiOp3iMGbpgtmfUnNlOi6', // pass
  email: 'krystian@gmail.com',
};
export const user6 = {
  id: 'f9f41940-708d-4380-84a0-460bf466c39d',
  first_name: 'Damian',
  last_name: 'Alonso',
  username: 'damlons',
  password: '$2a$10$iRZss/VgvQGlrblOqYfdEuUCNtJOlGymPiOp3iMGbpgtmfUnNlOi6', // pass
  email: 'damian@onet.pl',
};
// super admin
export const user7 = {
  id: 'dcb37a4b-12c1-4c4f-b2ed-5cd3df8bfd67',
  first_name: 'Bartek',
  last_name: 'Kowal',
  username: 'barkow',
  password: '$2a$10$iRZss/VgvQGlrblOqYfdEuUCNtJOlGymPiOp3iMGbpgtmfUnNlOi6', // pass
  email: 'bartek@kowal.pl',
};

export const UsersArray = [user1, user2, user3, user4, user5, user6, user7];

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex('users').insert(UsersArray).onConflict(['id']).merge();
}
