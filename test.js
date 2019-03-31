const funcs = require('./EduOrgfn');
jest.setTimeout(1000000);
//test creat works
// afterAll(() => {
  
// });



test('testing that get all works', async () => {
  expect.assertions(5)
  const response1 =  await funcs.getEduOrg()
  await funcs.createEduOrg({userName:'uayyyyyyyyya', name: 'aaaaaaaaaa',  password: '123h45678', email: 'a@gmail.com'})    
  const response =  await funcs.getEduOrg()
  const l = 1 + response1.data.data.length
  expect(response.data.data.length).toBe(l)
  expect(response.data.data[l-1].userName).toEqual('uayyyyyyyyya')
  expect(response.data.data[l-1].name).toEqual('aaaaaaaaaa')
  expect(response.data.data[l-1].email).toEqual('a@gmail.com')
  expect(response.data.data[l-1].password).toEqual('123h45678')
  
  
});
    test(`Create Edu Org`, async () => {
        expect.assertions(4) //this depends on how many expect I am using
        const l=(await funcs.getEduOrg()).data.data.length
        await funcs.createEduOrg({
          userName:'MMMM',
          name:'MMMMMMMM',
          password:"21323234",
          email:'MMMMMM@gg.com'
        })
        //const response =  await funcs.createEduOrg()
        const response =await funcs.getEduOrg();
        console.log(l)
        console.log(response.data.data.length)
        //4 expect -> assertions(4)
        expect(response.data.data[l].userName).toEqual('MMMM')
        expect(response.data.data[l].name).toEqual('MMMMMMMM')
        expect(response.data.data[l].password).toEqual('21323234')
        expect(response.data.data[l].email).toEqual('MMMMMM@gg.com')
        
      });

      test('testing that update works for EduOrg', async ()=>{
        expect.assertions(4)
        await funcs.createEduOrg({userName: 'akdslfm96', email: 'a@x.com', password: 'a1fiofbdk$',name:'Lamaaa fk'})  
       
        const response =  await funcs.getEduOrg()
     
        const l = response.data.data.length
        await funcs.updateEduOrg(response.data.data[l-1]._id,{userName: 'lamaazh2t', email: 'v@x.com', password: 'a1fiofibdk$',name:'Lamaaa fd'})
       
        const response2 =  await funcs.getEduOrg()
      
        const l2 =  response2.data.data.length
        //console.log
        expect(response2.data.data[l2-1].userName).toEqual('lamaazh2t')
        expect(response2.data.data[l2-1].email).toEqual('v@x.com')
        
        expect(response2.data.data[l2-1].password).toEqual('a1fiofibdk$')
        expect(response2.data.data[l2-1].name).toEqual('Lamaaa fd')
      });
