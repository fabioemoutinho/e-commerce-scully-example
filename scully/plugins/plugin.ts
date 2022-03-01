import { HandledRoute, registerPlugin, httpGetJson } from '@scullyio/scully';
import { Product } from '../../src/app/product/product.model';
import { environment } from '../../src/environments/environment.prod';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const product = 'product';

const productRoutes = async (route?: string): Promise<HandledRoute[]> => {
  const yarg = yargs(hideBin(process.argv));
  const argv = await yarg.option('productIds', { type: 'string' }).argv;

  // if there are --productIds being passed in npx scully --productIds=1,2,3
  // then only generate static files for those products
  // else fetch all products from API and map the returned IDs.
  const productIds: string[] = argv.productIds
    ? argv.productIds.split(',')
    : ((await httpGetJson(`${environment.api.url}/products`)) as Product[]).map(
        (product) => product.id.toString()
      );
  const productRoutes: HandledRoute[] = productIds.map((id) => ({
    route: `/product/${id}`,
  }));

  return Promise.resolve(productRoutes);
};

const validator = async () => [];

registerPlugin('router', product, productRoutes, validator);
