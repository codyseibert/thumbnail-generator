type RegisterArgs = {
  email: string;
  password: string;
}

export const register = (userInfo: RegisterArgs) => {
  return fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  }).then(res => res.json());
};