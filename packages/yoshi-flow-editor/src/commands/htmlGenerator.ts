import path from 'path';
import fs from 'fs-extra';
import { STATICS_DIR } from 'yoshi-config/build/paths';
import renderVM from '../server/vm';
import { FlowEditorModel } from '../model';

type vmType = 'editor' | 'settings';

const templatesPath = path.join(__dirname, '../server/templates');

const vmPaths: Record<vmType, string> = {
  editor: path.join(templatesPath, './editorApp.vm'),
  settings: path.join(templatesPath, './settingsApp.vm'),
};

const generateHTML = (type: vmType, widgetName: string) => {
  const destinationDir = path.join(process.cwd(), STATICS_DIR, type);
  const vmPath = vmPaths[type];
  const rendered = renderVM(vmPath, {
    widgetName,
    clientTopology: {
      staticsBaseUrl: '../',
    },
  });
  fs.copyFileSync(vmPath, path.join(destinationDir, `${widgetName}.vm`));
  fs.writeFileSync(path.join(destinationDir, `${widgetName}.html`), rendered);
};

const syncHTMLDirectory = (type: vmType) => {
  fs.mkdirpSync(path.join(STATICS_DIR, type));
};

export const generateEditorHTMLFiles = (model: FlowEditorModel) => {
  syncHTMLDirectory('editor');
  syncHTMLDirectory('settings');
  model.components.forEach(component => {
    generateHTML('editor', component.name);
    generateHTML('settings', component.name);
  });
};
