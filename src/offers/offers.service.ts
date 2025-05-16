import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
  ) {}
  create(createOfferDto: CreateOfferDto) {
    const offer = this.offersRepository.create(createOfferDto);
    return this.offersRepository.save(offer);
  }
  findAll(query?: any) {
    return this.offersRepository.find(query);
  }
  findOne(id: number) {
    return this.offersRepository.findOneBy({ id });
  }
  update(id: number, updateOfferDto: UpdateOfferDto) {
    return this.offersRepository.update(id, updateOfferDto);
  }
  remove(id: number) {
    return this.offersRepository.delete(id);
  }
}
