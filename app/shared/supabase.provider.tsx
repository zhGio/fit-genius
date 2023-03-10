import { isFuture } from "date-fns";
import { createContext, useContext, useState } from "react";

import {
  AuthError,
  AuthResponse,
  Session,
  SupabaseClient,
} from "@supabase/supabase-js";

import { Database } from "./types/generated";

export const SupabaseClientContext = createContext<{
  session: Session | null;
  sessionError: AuthError | null;
  isAuthenticated: boolean;
  client: SupabaseClient<Database, "public"> | null;
  setAuthSession: (
    access: string,
    refresh: string
  ) => Promise<AuthResponse>;
} | null>(null);

type ClientProviderProps = {
  client: SupabaseClient<Database, "public">;
  children: React.ReactNode;
};

export const SupabaseClientProvider = ({
  client,
  children,
}: ClientProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionError, setSessionError] = useState<AuthError | null>(null);

  const setAuthSession = async (
    accessToken: string,
    refreshToken: string
  ) =>
    await client.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

  const isValidExpiry = (session: Session | null | undefined): boolean =>
    (session &&
      session.user !== null &&
      session.expires_at &&
      session.expires_at > 0 &&
      isFuture(new Date(session.expires_at * 1000))) ||
    false;

  return (
    <SupabaseClientContext.Provider
      value={{
        session,
        client,
        isAuthenticated: isValidExpiry(session),
        sessionError,
        setAuthSession,
      }}>
      {children}
    </SupabaseClientContext.Provider>
  );
};

export function useSupabase() {
  const context = useContext(SupabaseClientContext);

  return {
    session: context?.session,
    sessionError: context?.sessionError,
    isAuthenticated: context?.session?.user !== null,
    setAuthSession: context?.setAuthSession,
    client: context?.client,
  };
}
