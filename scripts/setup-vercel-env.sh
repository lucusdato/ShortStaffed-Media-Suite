#!/bin/bash

# Script to add environment variables to Vercel
# Run this with: bash scripts/setup-vercel-env.sh

echo "Setting up Vercel environment variables..."

# Add each environment variable to production, preview, and development
echo "https://plifaodatxdjgzzeefxk.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsaWZhb2RhdHhkamd6emVlZnhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNDY5MTksImV4cCI6MjA3NjkyMjkxOX0.-fb2KPE_Z7KhRWGl2ZdYAAtVQEewjbD6F83iP_GfJ6w" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsaWZhb2RhdHhkamd6emVlZnhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNDY5MTksImV4cCI6MjA3NjkyMjkxOX0.-fb2KPE_Z7KhRWGl2ZdYAAtVQEewjbD6F83iP_GfJ6w" | vercel env add SUPABASE_SERVICE_ROLE_KEY
echo "Dato1234!" | vercel env add ADMIN_PASSWORD
echo "Dato1234!" | vercel env add ANALYTICS_ADMIN_PASSWORD

echo "Environment variables setup complete!"
