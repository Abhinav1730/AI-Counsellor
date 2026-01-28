const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const setupDatabase = async () => {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL not found in .env. Skipping database schema sync.');
    return;
  }

  const client = await pool.connect();
  try {
    console.log('🚀 Synchronizing database schema...');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID PRIMARY KEY,
        onboarding_complete BOOLEAN DEFAULT FALSE,
        educationLevel TEXT,
        major TEXT,
        gpa TEXT,
        intendedDegree TEXT,
        fieldOfStudy TEXT,
        targetIntake TEXT,
        preferredCountry TEXT,
        budget TEXT,
        funding TEXT,
        testStatus TEXT,
        sopStatus TEXT,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Optional: Enable Row Level Security
      ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

      -- Optional: Create policy to allow users to see/edit their own data
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile'
        ) THEN
          CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
        ) THEN
          CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile'
        ) THEN
          CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
        END IF;
      END
      $$;
    `);

    console.log('✅ Database schema is up to date.');
  } catch (err) {
    console.error('❌ Error synchronizing database schema:', err.message);
  } finally {
    client.release();
  }
};

module.exports = { setupDatabase, pool };
