import Foundation
import Supabase

class SupabaseManager {
    static let shared = SupabaseManager()

    let client: Supabase.Client

    private init() {
        let supabaseURL = URL(string: "https://taiichrigowbyzqkxngv.supabase.co")!
        let supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhaWljaHJpZ293Ynl6cWt4bmd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNjQ5MzMsImV4cCI6MjA4NTY0MDkzM30.JfOdmnNABTqupMmDBnFgXaj8q5TJ92LgcUwgtCEG7Bw"

        client = Supabase.Client(
            supabaseURL: supabaseURL,
            supabaseKey: supabaseKey
        )
    }
}
