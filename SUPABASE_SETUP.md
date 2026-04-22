# Supabase Setup Guide for CryptoWala

This guide will help you connect your waitlist form to Supabase.

## Step 1: Install Supabase Client

Run the following command in your project directory:

```bash
npm install @supabase/supabase-js
```

## Step 2: Get Your Supabase Credentials

1. Go to [Supabase](https://supabase.com) and sign in (or create an account)
2. Create a new project or select an existing one
3. Go to **Project Settings** > **API**
4. Copy the following:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

## Step 3: Update Environment Variables

Update the `.env` file in your project root with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** Make sure to add `.env` to your `.gitignore` file to keep your credentials secure.

## Step 4: Create the Database Table

In your Supabase dashboard:

1. Go to the **SQL Editor** section
2. Click **New Query**
3. Paste the following SQL and click **Run**:

```sql
-- Create the waitlist_submissions table
CREATE TABLE waitlist_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert submissions
CREATE POLICY "Anyone can submit to waitlist"
ON waitlist_submissions
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow authenticated users to view submissions (optional)
CREATE POLICY "Only authenticated users can view submissions"
ON waitlist_submissions
FOR SELECT
TO authenticated
USING (true);

-- Create an index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist_submissions(email);

-- Create an index on created_at for sorting
CREATE INDEX idx_waitlist_created_at ON waitlist_submissions(created_at DESC);
```

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the waitlist section of your website
3. Fill out the form and submit it
4. Check your Supabase dashboard:
   - Go to **Table Editor**
   - Select the `waitlist_submissions` table
   - You should see your submission!

## Optional: Email Validation

To prevent duplicate email submissions, you can add a unique constraint:

```sql
ALTER TABLE waitlist_submissions
ADD CONSTRAINT unique_email UNIQUE (email);
```

## Optional: View Your Submissions

To view all submissions in your Supabase dashboard:

1. Go to **Table Editor**
2. Click on `waitlist_submissions`
3. You'll see all the submitted data with timestamps

## Exporting Data

To export your waitlist submissions:

1. In the **Table Editor**, click on `waitlist_submissions`
2. Click the **Export** button (CSV format)
3. You can now use this data in your email marketing tools

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure your `.env` file exists and contains the correct variables
- Restart your development server after adding environment variables

### Error: "Failed to insert"
- Check that your table was created correctly
- Verify that Row Level Security policies are set up properly
- Check your browser console for detailed error messages

### Form submission doesn't work
- Open browser Developer Tools (F12) and check the Console tab for errors
- Verify your Supabase URL and API key are correct
- Make sure you ran `npm install @supabase/supabase-js`

## Security Best Practices

1. **Never commit your `.env` file** to version control
2. Add `.env` to your `.gitignore` file
3. Use Row Level Security policies to control data access
4. Regularly monitor your Supabase usage and logs
5. Consider adding rate limiting to prevent spam submissions

## Next Steps

- Set up email notifications when someone joins the waitlist
- Add duplicate email checking
- Create an admin dashboard to view submissions
- Export data regularly for your email campaigns
