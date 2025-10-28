// Quick test script to verify Supabase connection and check database schema
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://plifaodatxdjgzzeefxk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsaWZhb2RhdHhkamd6emVlZnhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNDY5MTksImV4cCI6MjA3NjkyMjkxOX0.-fb2KPE_Z7KhRWGl2ZdYAAtVQEewjbD6F83iP_GfJ6w';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');
  
  // Test 1: Check if users table exists
  console.log('Test 1: Checking users table...');
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*')
    .limit(5);
  
  if (usersError) {
    console.log('❌ Users table error:', usersError.message);
    console.log('   Full error:', JSON.stringify(usersError, null, 2));
  } else {
    console.log('✅ Users table exists!');
    console.log(`   Found ${users.length} users`);
    if (users.length > 0) {
      console.log('   Sample user:', users[0]);
    }
  }
  
  console.log('\n');
  
  // Test 2: Check tool_usage_events table
  console.log('Test 2: Checking tool_usage_events table...');
  const { data: events, error: eventsError } = await supabase
    .from('tool_usage_events')
    .select('*')
    .limit(5);
  
  if (eventsError) {
    console.log('❌ Events table error:', eventsError.message);
  } else {
    console.log('✅ Events table exists!');
    console.log(`   Found ${events.length} events`);
  }
  
  console.log('\n');
  
  // Test 3: Check file_uploads table
  console.log('Test 3: Checking file_uploads table...');
  const { data: uploads, error: uploadsError } = await supabase
    .from('file_uploads')
    .select('*')
    .limit(5);
  
  if (uploadsError) {
    console.log('❌ Uploads table error:', uploadsError.message);
  } else {
    console.log('✅ Uploads table exists!');
    console.log(`   Found ${uploads.length} uploads`);
  }
  
  console.log('\n📊 Connection test complete!');
}

testConnection().catch(console.error);
