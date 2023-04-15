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
    const created_at = new Date().toISOString();

    const newId = uuidv4().slice(0, 12);

    const name = req.body.name ?? '';
    const email = req.body.email ?? '';
    const deferral_days = req.body.deferral_days ?? 0;
    const credit_limit = req.body.credit_limit ?? 0;

    const newOrgId = uuidv4();
    const organizationName = req.body.organization.name ?? '';
    const inn = req.body.organization.inn ?? '';
    const kpp = req.body.organization.kpp ?? '';
    const ogrn = req.body.organization.ogrn ?? '';
    const addr = req.body.organization.addr ?? '';
    const invoice_emails = req.body.invoice_emails ?? [];

    let bank_accounts = req.body.organization?.bank_accounts ?? [];

    let metadata = req.body.meta ?? {};

    if (bank_accounts.length > 0) {
      bank_accounts = bank_accounts.map(account => {
        const newBankAccountId = uuidv4();
        return {
          ...account,
          id: newBankAccountId,
          created_at,
          updated_at: created_at,
        };
      });
    }

    req.body = {
      id: newId,
      name,
      email,
      deferral_days,
      org: {
        id: newOrgId,
        name: organizationName,
        inn,
        kpp,
        ogrn,
        addr,
        bank_accounts,
        created_at,
        updated_at: created_at,
      },
      balance: {
        currency: 'RUB',
        current_amount: 90000,
        credit_limit,
        available_amount: 90000,
      },
      metadata,
      created_at,
      updated_at: created_at,
      status: 'active',
      invoice_prefix: 'L1RFJG',
      invoice_emails,
    };
  }

  // Continue to JSON Server router
  next();
});
server.use(router);

server.listen(8080, () => {
  console.log('JSON Server is running');
});
