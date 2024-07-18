const fastify = require("fastify")({
  logger: true,
  trustProxy: true,
});
require("dotenv").config();

fastify.register(require("fastify-supabase"), {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
});

fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.get("/uexist", async function (request, reply) {
  const { supabase } = fastify;
  const { data, error } = await supabase
    .from("cnas")
    .select("uname")
    .eq("uname", request.query.u)
    .single();

  if (error) {
    return { exists: false };
  }

  reply.header("Access-Control-Allow-Origin", "*").send({ exists: true });
});

fastify.get("/money", async function (request, reply) {
  const { supabase } = fastify;
  const { data, error } = await supabase
    .from("cnas")
    .select("uname,amount")
    .eq("uname", request.query.u)
    .single();

  if (error) {
    return { data, error };
  }

  reply.header("Access-Control-Allow-Origin", "*").send({
    uname: data.uname,
    amount: data.amount,
  });
});

fastify.get("/amoney", async function (request, reply) {
  const { supabase } = fastify;
  const { data, error } = await supabase
    .from("cnas")
    .select("uname,amount")
    .eq("uname", request.query.u)
    .single();

  if (error) {
    return { data, error };
  }

  const { fdata, ferror } = await supabase
    .from("cnas")
    .update({ amount: Number(data.amount) + Number(request.query.a) })
    .eq("uname", request.query.u)
    .select()
    .single();

  if (ferror) {
    return { fdata, ferror };
  }

  reply.header("Access-Control-Allow-Origin", "*").send({
    uname: data.uname,
    amount: Number(data.amount) + Number(request.query.a),
  });
});

fastify.get("/croll", async function (request, reply) {
  const r1 = Number(request.query.a);
  const r2 = Number(request.query.b);
  const r3 = Number(request.query.c);
  const payin = Number(request.query.p);
  let amount = 0;
  console.log(r1, r2, r3, payin);

  const { supabase } = fastify;
  let { data, error } = await supabase
    .from("cnas")
    .select("uname,amount")
    .eq("uname", request.query.u)
    .single();
  
  if (error) {
    return { data, error };
  }

  if (r1 == r2 && r2 == r3 && r1 == r3) {
    switch (r1) {
      case 1:
        amount = payin * 1.15;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      case 2:
        amount = payin * 1.25;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      case 3:
        amount = payin * 1.5;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      case 4:
        amount = payin * 2;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      case 5:
        amount = payin * 2.5;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      default:
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: data.amount,
        });
        break;
    }
  } else if ((r1 == r2 && r1 != r3) || (r1 == r3 && r1 != r2)) {
    switch (r1) {
      case 1:
        amount = payin * 0.85;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      case 2:
        amount = payin;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      case 3:
        amount = payin * 1.2;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      case 4:
        amount = payin * 1.35;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      case 5:
        amount = payin * 1.45;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      default:
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: data.amount,
        });
        break;
    }
  } else if (r2 == r3 && r1 != r2 && r1 != r3) {
    switch (r2) {
      case 1:
        amount = payin * 0.85;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      case 2:
        amount = payin;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      case 3:
        amount = payin * 1.2;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      case 4:
        amount = payin * 1.35;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      case 5:
        amount = payin * 1.45;
        console.log(amount)
        var { udata, uerror } = await supabase
          .from("cnas")
          .update({ amount: Number(data.amount) + amount })
          .eq("uname", request.query.u)
          .select()
          .single();
        if (uerror) {
          return { udata, uerror };
        }
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: Number(data.amount) + amount,
        });
        break;
      default:
        reply.header("Access-Control-Allow-Origin", "*").send({
          uname: data.uname,
          amount: data.amount,
        });
        break;
    }
  } else if (r1 != r2 && r1 != r3 && r2 != r3) {
    amount = payin * 0.7;
    console.log(amount)
    var { udata, uerror } = await supabase
      .from("cnas")
      .update({ amount: Number(data.amount) + amount })
      .eq("uname", request.query.u)
      .select()
      .single();
    if (uerror) {
      return { udata, uerror };
    }
    reply.header("Access-Control-Allow-Origin", "*").send({
      uname: data.uname,
      amount: Number(data.amount) + amount,
    });
  }
});

fastify.get("/payout", async function (request, reply) {
  const { supabase } = fastify;
  const { data, error } = await supabase
    .from("cnas")
    .select("uname,amount")
    .eq("uname", request.query.u)
    .single();

  if (error) {
    return { data, error };
  }
  reply.header("Access-Control-Allow-Origin", "*").send({
    uname: data.uname,
    amount: Math.floor(Math.round(data.amount)),
    payout: Math.floor(Math.round(data.amount * 0.85)),
  });
});

fastify.listen({ port: 8080, host: "::" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
