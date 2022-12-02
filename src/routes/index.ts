import { Application, Router } from 'express';
import { readdirSync } from 'fs';

const PATH_CONTROLLERS = `${__dirname}/../controllers`;

const cleanFileName = (fileName: string) => {
  const filename = fileName.split('.').shift();
  return filename;
};

const routerAPI = (app: Application) => {
  const router = Router();
  app.use('/api/v1', router);

  readdirSync(PATH_CONTROLLERS).filter((filename) => {
    const cleanName = cleanFileName(filename);
    import(`../controllers/${cleanName}.controller`).then(
      (moduleController) => {
        router.use(`/${cleanName}`, moduleController.default);
      }
    );
  });
};

export default routerAPI;
