import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
  ) {}
  create(createWishlistDto: CreateWishlistDto) {
    const wishlist = this.wishlistsRepository.create(createWishlistDto);
    return this.wishlistsRepository.save(wishlist);
  }
  findAll(query?: any) {
    return this.wishlistsRepository.find(query);
  }
  findOne(id: number) {
    return this.wishlistsRepository.findOneBy({ id });
  }
  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistsRepository.update(id, updateWishlistDto);
  }
  remove(id: number) {
    return this.wishlistsRepository.delete(id);
  }
}
