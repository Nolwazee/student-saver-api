import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type StoreName =
  | 'foodlovers'
  | 'shoprite'
  | 'pnp'
  | 'checkers'
  | 'game'
  | 'pnpclothing';

@Entity('products')
@Index(['store', 'sourceId'], { unique: true }) // one row per product per store
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // The retailer this price/listing came from
  @Column()
  store: StoreName;

  // The retailer's own product id / SKU / slug, used to upsert on re-scrape
  @Column()
  sourceId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  category?: string;

  @Column('float')
  price: number;

  @Column({ nullable: true })
  currency?: string; // defaults to ZAR

  @Column({ nullable: true })
  unit?: string; // e.g. "1L", "500g", "each"

  @Column({ nullable: true })
  imageUrl?: string;

  @Column()
  productUrl: string;

  @Column({ default: true })
  inStock: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date; // used to know how fresh a price is
}
