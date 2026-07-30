migrate(
  (app) => {
    let dentistUser
    try {
      dentistUser = app.findAuthRecordByEmail('_pb_users_auth_', 'daniel.elias@d2eadvisory.com.br')
    } catch (_) {
      return
    }

    if (dentistUser.getString('role') !== 'dentist') {
      dentistUser.set('role', 'dentist')
      app.save(dentistUser)
    }

    let dentist
    try {
      dentist = app.findFirstRecordByData('dentists', 'user', dentistUser.id)
    } catch (_) {
      const dc = app.findCollectionByNameOrId('dentists')
      dentist = new Record(dc)
      dentist.set('user', dentistUser.id)
      dentist.set('license_status', 'active')
      dentist.set('cro', '12345')
      app.save(dentist)
    }

    var testPatients = [
      { email: 'maria.silva@test.com', name: 'Maria Silva', doc: '12345678901' },
      { email: 'joao.santos@test.com', name: 'João Santos', doc: '23456789012' },
      { email: 'ana.costa@test.com', name: 'Ana Costa', doc: '34567890123' },
      { email: 'pedro.lima@test.com', name: 'Pedro Lima', doc: '45678901234' },
    ]

    var pids = []
    testPatients.forEach(function (tp) {
      var pu
      try {
        pu = app.findAuthRecordByEmail('_pb_users_auth_', tp.email)
      } catch (_) {
        var uc = app.findCollectionByNameOrId('_pb_users_auth_')
        pu = new Record(uc)
        pu.setEmail(tp.email)
        pu.setPassword('Skip@Pass')
        pu.setVerified(true)
        pu.set('name', tp.name)
        pu.set('role', 'patient')
        pu.set('status', 'active')
        app.save(pu)
      }
      var pr
      try {
        pr = app.findFirstRecordByData('patients', 'user', pu.id)
      } catch (_) {
        var pc = app.findCollectionByNameOrId('patients')
        pr = new Record(pc)
        pr.set('user', pu.id)
        pr.set('document_id', tp.doc)
        pr.set('credit_status', 'approved')
        app.save(pr)
      }
      pids.push(pr.id)
    })

    var cc = app.findCollectionByNameOrId('clinical_cases')
    var now = Date.now()
    var dAgo = function (d) {
      return new Date(now - d * 86400000).toISOString()
    }
    var dAhead = function (d) {
      return new Date(now + d * 86400000).toISOString()
    }

    var cases = [
      { p: 0, s: 'sent_to_lab', n: 'Maria-Plan', sd: dAhead(7) },
      { p: 1, s: 'sent_to_lab', n: 'Joao-Plan', sd: dAhead(7) },
      { p: 2, s: 'sent_to_lab', n: 'Ana-Plan', sd: dAhead(10) },
      { p: 0, s: 'lab_responded', n: 'Maria-Planejado', sd: dAhead(5), lr: dAgo(3) },
      { p: 3, s: 'lab_responded', n: 'Pedro-Planejado', sd: dAhead(5), lr: dAgo(2) },
      { p: 1, s: 'in_treatment', n: 'Joao-Trat', sd: dAhead(30), lr: dAgo(30), fc: dAgo(20) },
      { p: 2, s: 'in_treatment', n: 'Ana-Trat', sd: dAhead(45), lr: dAgo(40), fc: dAgo(25) },
      { p: 3, s: 'in_treatment', n: 'Pedro-Trat', sd: dAhead(60), lr: dAgo(50), fc: dAgo(35) },
      {
        p: 0,
        s: 'concluded',
        n: 'Maria-Concl-Ap',
        sd: dAgo(5),
        lr: dAgo(90),
        fc: dAgo(80),
        lc: dAgo(10),
        cc: 0,
      },
      {
        p: 1,
        s: 'concluded',
        n: 'Joao-Concl-1M',
        sd: dAgo(10),
        lr: dAgo(120),
        fc: dAgo(110),
        lc: dAgo(15),
        cc: 1,
      },
      {
        p: 2,
        s: 'concluded',
        n: 'Ana-Concl-2M',
        sd: dAgo(15),
        lr: dAgo(150),
        fc: dAgo(140),
        lc: dAgo(20),
        cc: 2,
      },
      {
        p: 3,
        s: 'concluded',
        n: 'Pedro-Concl-3M',
        sd: dAgo(20),
        lr: dAgo(180),
        fc: dAgo(170),
        lc: dAgo(25),
        cc: 3,
      },
    ]

    cases.forEach(function (c) {
      try {
        app.findFirstRecordByData('clinical_cases', 'notes', c.n)
      } catch (_) {
        var r = new Record(cc)
        r.set('dentist', dentist.id)
        r.set('patient', pids[c.p])
        r.set('status', c.s)
        r.set('notes', c.n)
        r.set('sla_deadline', c.sd)
        if (c.lr) r.set('lab_response_date', c.lr)
        if (c.fc) r.set('first_consultation_date', c.fc)
        if (c.lc) r.set('last_consultation_date', c.lc)
        if (c.cc !== undefined) r.set('consultation_count', c.cc)
        app.save(r)
      }
    })
  },
  (app) => {
    var notes = [
      'Maria-Plan',
      'Joao-Plan',
      'Ana-Plan',
      'Maria-Planejado',
      'Pedro-Planejado',
      'Joao-Trat',
      'Ana-Trat',
      'Pedro-Trat',
      'Maria-Concl-Ap',
      'Joao-Concl-1M',
      'Ana-Concl-2M',
      'Pedro-Concl-3M',
    ]
    notes.forEach(function (n) {
      try {
        app.delete(app.findFirstRecordByData('clinical_cases', 'notes', n))
      } catch (_) {}
    })
  },
)
