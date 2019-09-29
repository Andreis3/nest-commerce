const axios = require('axios');

(async () => {
  try{
    const { data } = await axios.post('http://localhost:3000/api/auth/login', {
      username: 'athena',
      password: 'athena',
    });
    console.log(data);
    const { token } = data;
    const { data: res2 } = await axios.get('http://localhost:3000/api/auth', {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(res2)
  }catch (err) {
    console.log(err)
  }

})();

//"start": "ts-node -r tsconfig-paths/register src/main.ts",
//"start:dev": "tsc-watch -p tsconfig.build.json --onSuccess \"node dist/main.js\"",
//"test": "jest"
