import Foundation
import Supabase

class SupabaseClient {
    static let shared = SupabaseClient()

    let client: SupabaseClient

    private init() {
        // IMPORTANTE: Substitua com suas credenciais do Supabase
        let supabaseURL = URL(string: "YOUR_SUPABASE_URL")!
        let supabaseKey = "YOUR_SUPABASE_ANON_KEY"

        client = SupabaseClient(
            supabaseURL: supabaseURL,
            supabaseKey: supabaseKey
        )
    }
}
