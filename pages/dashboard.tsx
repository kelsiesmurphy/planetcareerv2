import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [userProfile, setUserProfile] = useState<
    any
  >({});

  const getUserProfile = async () => {
    const { data, error } = await supabase
    .from("user_profile")
    .select()
    .eq("id", session?.user.id);
    setUserProfile(data?.[0]);
  };

  useEffect(() => {
    if (session) {
      getUserProfile();
    }
  }, [session]);

  if (userProfile) {
    return <h1>user: {userProfile.id}</h1>;
  }
}
