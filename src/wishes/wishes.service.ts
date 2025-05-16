import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}
  create(createWishDto: CreateWishDto) {
    const wish = this.wishesRepository.create(createWishDto);
    return this.wishesRepository.save(wish);
  }
  findAll(query?: any) {
    return this.wishesRepository.find(query);
  }
  findOne(id: number) {
    return this.wishesRepository.findOneBy({ id });
  }
  update(id: number, updateWishDto: UpdateWishDto) {
    return this.wishesRepository.update(id, updateWishDto);
  }
  remove(id: number) {
    return this.wishesRepository.delete(id);
  }
}
