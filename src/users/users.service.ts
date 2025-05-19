import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, FindOneOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/utils/auth/passwords/hash';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }
  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  findOne(query: FindOneOptions<User>) {
    return this.usersRepository.findOneOrFail(query);
  }

  async create(createUserDto: CreateUserDto) {
    const { password, username, email, ...rest } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });
    if (existingUser) {
      if (existingUser.username === username) {
        throw new ConflictException(
          'Пользователь с таким именем уже существует',
        );
      }
      if (existingUser.email === email) {
        throw new ConflictException(
          'Пользователь с таким email уже существует',
        );
      }
    }
    const hashedPassword = await hashPassword(password);

    try {
      const user = this.usersRepository.create({
        username,
        email,
        ...rest,
        password: hashedPassword,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new ConflictException('Ошибка при создании пользователя');
    }
  }
  async findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }
  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
  async findMany(query: string) {
    return await this.usersRepository.find({
      where: [
        { username: ILike(`%${query}%`) },
        { email: ILike(`%${query}%`) },
      ],
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async updateMyProfile(id: number, updateUserDto: UpdateUserDto) {
    const { password, email, username } = updateUserDto;

    const user = await this.findById(id);

    if (email && email !== user.email) {
      const userWithExistingEmail = await this.usersRepository.findOne({
        where: { email },
      });
      if (userWithExistingEmail) {
        throw new ConflictException('Email is already taken');
      }
    }
    if (username && username !== user.username) {
      const userWithExistingUsername = await this.usersRepository.findOne({
        where: { username },
      });
      if (userWithExistingUsername) {
        throw new ConflictException('Username is already taken');
      }
    }

    if (password) {
      updateUserDto.password = await hashPassword(password);
    }

    return this.usersRepository.save({ ...user, ...updateUserDto });
  }
}
