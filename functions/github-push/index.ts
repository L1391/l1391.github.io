import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';
const SUPABASE_URL = 'https://vhncezbspfetgozdumhv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZobmNlemJzcGZldGdvemR1bWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4NzQ5MTQsImV4cCI6MjA0MDQ1MDkxNH0.Lj6tgLO9_iTw2Ydtzk8zzrM7bPh11kz0pwkP06KXMFg';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const handler = async (req)=>{
  const { commits } = await req.json();
  let new_pages = commits[0].added;
  new_pages = new_pages.concat(commits[0].modified);
  console.log(new_pages);

  await new Promise(f => setTimeout(f, 1000*120)); // delay two minutes so that github pages can update

  let email_body = "Hello subscriber, my name is Lindsey \n";
  for (let new_page of new_pages){
    email_body = email_body + '\n https://l1391.github.io/' + new_page + '\n';
    const page_html = await fetch('https://l1391.github.io/' + new_page, {
      method: 'GET'
    });
    email_body = email_body + await page_html.text();
    console.log("added html");
  }
  console.log("out of for loop");
  console.log(email_body);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer re_hxpXoMSF_6CEchHGy1YZrRdfU6wQErjrj`
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: 'lindseyjturn@gmail.com',
      subject: 'Hello, Lindsey has something to say',
      html: email_body
    })
  });
  const data = await res.json();
  console.log(data);
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
Deno.serve(handler);
