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
    // console.log(req.body);
    const createdAt = new Date();

    const newId = uuidv4().slice(0, 12);

    const name = req.body.name ?? '';
    const email = req.body.email ?? '';
    const deferral_days = req.body.deferral_days ?? 0;
    const credit_limit = req.body.credit_limit ?? 0;

    req.body = {
      id: newId,
      name,
      email,
      deferral_days,
      org: {
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
      },
      balance: {
        currency: 'RUB',
        current_amount: 90000,
        credit_limit,
        available_amount: 90000,
      },
      metadata: {
        key1: 'val1',
      },
      created_at: createdAt.toISOString(),
      updated_at: createdAt.toISOString(),
      status: 'active',
      invoice_prefix: 'L1RFJG',
      invoice_emails: ['123@mail.com'],
    };

  }

  // Continue to JSON Server router
  next();
});
server.use(router);

server.listen(8080, () => {
  console.log('JSON Server is running');
});
