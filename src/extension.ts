import * as vscode from "vscode";

import {
    Executable,
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    Trace,
    TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: "file", language: "ice" }],
    };
    const run: Executable = {
        command: "C:/Users/tbuli/Apps/DEV/ice/target/debug/ice-lsp.exe",
        args: ["stdio"],
        transport: TransportKind.stdio,
    };
    const serverOptions: ServerOptions = {
        run,
        debug: run,
    };

    client = new LanguageClient(
        "ice-lsp",
        "ice language server",
        serverOptions,
        clientOptions
    );
    client.setTrace(Trace.Verbose);
    client.start();
    // client.
    // context.subscriptions.push();
}

export function deactivate(): Thenable<void> | undefined {
    if (client) {
        return client.stop();
    }
}
