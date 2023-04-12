// server.js
const jsonServer = require('json-server');
const { v4: uuidv4 } = require('uuid');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    const createdAt = new Date();
    req.body.createdAt = createdAt.toISOString();
    req.body.updatedAt = createdAt.toISOString();

		
    req.body.id = uuidv4().slice(0, 12);

    req.body.org = {
      id: '131b9d78-ad58-415f-aab4-779a9e87edfd',
      name: 'Название организации',
      inn: '7709655212',
      kpp: '772901001',
      ogrn: '1026101794313',
      addr: 'Юридический адрес',
      bank_accounts: [
        {
          id: 'c0ca02e9-be90-456b-b77c-82189c7651ae',
          name: '2',
          bik: '123456783',
          account_number: '12345678901234567891',
          corr_account_number: '09876543210987654321',
          is_default: true,
          created_at: '2023-03-31T13:27:06Z',
          updated_at: '2023-03-31T13:35:58Z',
        },

        {
          id: '23c3a0d6-c13f-45b1-9143-ef27af1b6d44',
          name: 'Название1',
          bik: '123456783',
          account_number: '12345678901234567890',
          corr_account_number: '09876543210987654321',
          is_default: false,
          created_at: '2023-03-31T13:27:06Z',
          updated_at: '2023-03-31T13:35:58Z',
        },
      ],
      created_at: '2023-03-31T13:27:06Z',
      updated_at: '2023-03-31T13:35:58Z',
    };
    req.body.metadata = {
      key1: 'val1',
    };
    req.body.balance.current_amount = 9000;
    req.body.balance.available_amount = 9000;


    req.body.metadata = {};
    req.body.status = 'active';
    req.body.invoice_prefix = 'L1RFJG';
    req.body.invoice_emails = 'test@test.com';
  }
  // Continue to JSON Server router
  next();
});
server.use(router);

server.listen(8080, () => {
  console.log('JSON Server is running');
});
