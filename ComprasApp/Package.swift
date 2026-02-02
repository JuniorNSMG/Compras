// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "ComprasApp",
    platforms: [
        .iOS(.v17)
    ],
    products: [
        .library(
            name: "ComprasApp",
            targets: ["ComprasApp"])
    ],
    dependencies: [
        .package(url: "https://github.com/supabase/supabase-swift.git", from: "2.5.0")
    ],
    targets: [
        .target(
            name: "ComprasApp",
            dependencies: [
                .product(name: "Supabase", package: "supabase-swift")
            ],
            path: "Sources"
        )
    ]
)
