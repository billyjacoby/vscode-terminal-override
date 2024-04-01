// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Terminal override active! Use the built in terminal binding to open the terminal defined in settings.'
  );

  vscode.window.onDidOpenTerminal((terminal: vscode.Terminal) => {
    const terminalCommand: string | undefined = vscode.workspace
      .getConfiguration('terminal-override')
      .get('command');
    if (!terminalCommand) {
      vscode.window.showErrorMessage('Terminal command not found!');
      return;
    }
    terminal.sendText(terminalCommand);
    terminal.hide();
    setTimeout(() => {
      terminal.dispose();
    }, 2000);
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
