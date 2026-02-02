import Foundation
import Supabase

@MainActor
class AuthService: ObservableObject {
    @Published var currentUser: User?
    @Published var isAuthenticated = false

    private let supabase = SupabaseClient.shared.client

    init() {
        Task {
            await checkAuth()
        }
    }

    func checkAuth() async {
        do {
            let session = try await supabase.auth.session
            if let user = session.user {
                self.currentUser = User(
                    id: user.id,
                    email: user.email ?? ""
                )
                self.isAuthenticated = true
            }
        } catch {
            self.isAuthenticated = false
        }
    }

    func signUp(email: String, password: String) async throws {
        let response = try await supabase.auth.signUp(
            email: email,
            password: password
        )

        if let user = response.user {
            self.currentUser = User(
                id: user.id,
                email: user.email ?? ""
            )
            self.isAuthenticated = true
        }
    }

    func signIn(email: String, password: String) async throws {
        let session = try await supabase.auth.signIn(
            email: email,
            password: password
        )

        if let user = session.user {
            self.currentUser = User(
                id: user.id,
                email: user.email ?? ""
            )
            self.isAuthenticated = true
        }
    }

    func signOut() async throws {
        try await supabase.auth.signOut()
        self.currentUser = nil
        self.isAuthenticated = false
    }
}
