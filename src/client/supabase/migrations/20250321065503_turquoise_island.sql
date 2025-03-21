/*
  # Create user profiles and engagement tracking tables

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `total_points` (integer)
      - `created_at` (timestamp)
    - `social_connections`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `platform` (text)
      - `platform_user_id` (text)
      - `connected_at` (timestamp)
    - `engagement_points`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `platform` (text)
      - `points` (integer)
      - `source` (text)
      - `earned_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text,
  total_points integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create social connections table
CREATE TABLE IF NOT EXISTS social_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE,
  platform text NOT NULL,
  platform_user_id text NOT NULL,
  connected_at timestamptz DEFAULT now(),
  UNIQUE(user_id, platform)
);

-- Create engagement points table
CREATE TABLE IF NOT EXISTS engagement_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE,
  platform text NOT NULL,
  points integer NOT NULL,
  source text NOT NULL,
  earned_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagement_points ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read own social connections"
  ON social_connections
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can read own engagement points"
  ON engagement_points
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());