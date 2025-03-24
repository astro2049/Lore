import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParsePresencePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): boolean {
        return value !== undefined;
    }
}
