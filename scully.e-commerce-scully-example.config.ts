import { ScullyConfig } from '@scullyio/scully';

/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer';
import { Product } from './src/app/product/product.model';
import { environment } from './src/environments/environment.prod';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'e-commerce-scully-example',
  puppeteerLaunchOptions: {
    args: ['--no-sandbox'],
  },
  // add spsModulePath when using de Scully Platform Server,
  outDir: './dist/static',
  routes: {
    '/product/:slug': {
      type: 'json',
      slug: {
        url: `${environment.api.url}/products`,
        property: 'id',
        resultsHandler: (data: Product[]) => {
          console.log(data);
          return Array.isArray(data) ? data : [];
        },
      },
    },
  },
};
