import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }

  async validateFirebaseToken(token: string): Promise<any> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  async createOrUpdateUser(firebaseUser: any) {
    const { uid, email, displayName, photoURL } = firebaseUser;
    
    let user = await this.usersService.findByFirebaseUid(uid);
    
    if (!user) {
      user = await this.usersService.create({
        firebaseUid: uid,
        email,
        name: displayName,
        avatar: photoURL,
      });
    }

    return user;
  }

  async generateJwt(user: any) {
    const payload = { 
      sub: user.id, 
      email: user.email,
      firebaseUid: user.firebaseUid 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await this.usersService.comparePassword(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
} 