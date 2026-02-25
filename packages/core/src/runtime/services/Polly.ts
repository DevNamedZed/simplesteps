// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface DeleteLexiconInput {
  /** The name of the lexicon to delete. Must be an existing lexicon in the region. */
  Name: string;
}

export interface DescribeVoicesInput {
  /** Specifies the engine (standard, neural, long-form or generative) used by Amazon Polly when processing input text for speech synthesis. */
  Engine?: 'standard' | 'neural' | 'long-form' | 'generative';
  /** Boolean value indicating whether to return any bilingual voices that use the specified language as an additional language. For instance, if you request all languages that use US English (es-US), and t */
  IncludeAdditionalLanguageCodes?: boolean;
  /** The language identification tag (ISO 639 code for the language name-ISO 3166 country code) for filtering the list of voices returned. If you don't specify this optional parameter, all available voices */
  LanguageCode?: 'arb' | 'cmn-CN' | 'cy-GB' | 'da-DK' | 'de-DE' | 'en-AU' | 'en-GB' | 'en-GB-WLS' | 'en-IN' | 'en-US' | 'es-ES' | 'es-MX' | 'es-US' | 'fr-CA' | 'fr-FR' | 'is-IS' | 'it-IT' | 'ja-JP' | 'hi-IN' | 'ko-KR' | 'nb-NO' | 'nl-NL' | 'pl-PL' | 'pt-BR' | 'pt-PT' | 'ro-RO' | 'ru-RU' | 'sv-SE' | 'tr-TR' | 'en-NZ' | 'en-ZA' | 'ca-ES' | 'de-AT' | 'yue-CN' | 'ar-AE' | 'fi-FI' | 'en-IE' | 'nl-BE' | 'fr-BE' | 'cs-CZ' | 'de-CH' | 'en-SG';
  /** An opaque pagination token returned from the previous DescribeVoices operation. If present, this indicates where to continue the listing. */
  NextToken?: string;
}

export interface GetLexiconInput {
  /** Name of the lexicon. */
  Name: string;
}

export interface GetSpeechSynthesisTaskInput {
  /** The Amazon Polly generated identifier for a speech synthesis task. */
  TaskId: string;
}

export interface ListLexiconsInput {
  /** An opaque pagination token returned from previous ListLexicons operation. If present, indicates where to continue the list of lexicons. */
  NextToken?: string;
}

export interface ListSpeechSynthesisTasksInput {
  /** Maximum number of speech synthesis tasks returned in a List operation. */
  MaxResults?: number;
  /** The pagination token to use in the next request to continue the listing of speech synthesis tasks. */
  NextToken?: string;
  /** Status of the speech synthesis tasks returned in a List operation */
  Status?: 'scheduled' | 'inProgress' | 'completed' | 'failed';
}

export interface PutLexiconInput {
  /** Content of the PLS lexicon as string data. */
  Content: string;
  /** Name of the lexicon. The name must follow the regular express format [0-9A-Za-z]{1,20}. That is, the name is a case-sensitive alphanumeric string up to 20 characters long. */
  Name: string;
}

export interface StartSpeechSynthesisTaskInput {
  /** The format in which the returned output will be encoded. For audio stream, this will be mp3, ogg_vorbis, or pcm. For speech marks, this will be json. */
  OutputFormat: 'json' | 'mp3' | 'ogg_opus' | 'ogg_vorbis' | 'pcm';
  /** Amazon S3 bucket name to which the output file will be saved. */
  OutputS3BucketName: string;
  /** The input text to synthesize. If you specify ssml as the TextType, follow the SSML format for the input text. */
  Text: string;
  /** Voice ID to use for the synthesis. */
  VoiceId: 'Aditi' | 'Amy' | 'Astrid' | 'Bianca' | 'Brian' | 'Camila' | 'Carla' | 'Carmen' | 'Celine' | 'Chantal' | 'Conchita' | 'Cristiano' | 'Dora' | 'Emma' | 'Enrique' | 'Ewa' | 'Filiz' | 'Gabrielle' | 'Geraint' | 'Giorgio' | 'Gwyneth' | 'Hans' | 'Ines' | 'Ivy' | 'Jacek' | 'Jan' | 'Joanna' | 'Joey' | 'Justin' | 'Karl' | 'Kendra' | 'Kevin' | 'Kimberly' | 'Lea' | 'Liv' | 'Lotte' | 'Lucia' | 'Lupe' | 'Mads' | 'Maja' | 'Marlene' | 'Mathieu' | 'Matthew' | 'Maxim' | 'Mia' | 'Miguel' | 'Mizuki' | 'Naja' | 'Nicole' | 'Olivia' | 'Penelope' | 'Raveena' | 'Ricardo' | 'Ruben' | 'Russell' | 'Salli' | 'Seoyeon' | 'Takumi' | 'Tatyana' | 'Vicki' | 'Vitoria' | 'Zeina' | 'Zhiyu' | 'Aria' | 'Ayanda' | 'Arlet' | 'Hannah' | 'Arthur' | 'Daniel' | 'Liam' | 'Pedro' | 'Kajal' | 'Hiujin' | 'Laura' | 'Elin' | 'Ida' | 'Suvi' | 'Ola' | 'Hala' | 'Andres' | 'Sergio' | 'Remi' | 'Adriano' | 'Thiago' | 'Ruth' | 'Stephen' | 'Kazuha' | 'Tomoko' | 'Niamh' | 'Sofie' | 'Lisa' | 'Isabelle' | 'Zayd' | 'Danielle' | 'Gregory' | 'Burcu' | 'Jitka' | 'Sabrina' | 'Jasmine' | 'Jihye';
  /** Specifies the engine (standard, neural, long-form or generative) for Amazon Polly to use when processing input text for speech synthesis. Using a voice that is not supported for the engine selected wi */
  Engine?: 'standard' | 'neural' | 'long-form' | 'generative';
  /** Optional language code for the Speech Synthesis request. This is only necessary if using a bilingual voice, such as Aditi, which can be used for either Indian English (en-IN) or Hindi (hi-IN). If a bi */
  LanguageCode?: 'arb' | 'cmn-CN' | 'cy-GB' | 'da-DK' | 'de-DE' | 'en-AU' | 'en-GB' | 'en-GB-WLS' | 'en-IN' | 'en-US' | 'es-ES' | 'es-MX' | 'es-US' | 'fr-CA' | 'fr-FR' | 'is-IS' | 'it-IT' | 'ja-JP' | 'hi-IN' | 'ko-KR' | 'nb-NO' | 'nl-NL' | 'pl-PL' | 'pt-BR' | 'pt-PT' | 'ro-RO' | 'ru-RU' | 'sv-SE' | 'tr-TR' | 'en-NZ' | 'en-ZA' | 'ca-ES' | 'de-AT' | 'yue-CN' | 'ar-AE' | 'fi-FI' | 'en-IE' | 'nl-BE' | 'fr-BE' | 'cs-CZ' | 'de-CH' | 'en-SG';
  /** List of one or more pronunciation lexicon names you want the service to apply during synthesis. Lexicons are applied only if the language of the lexicon is the same as the language of the voice. */
  LexiconNames?: string[];
  /** The Amazon S3 key prefix for the output speech file. */
  OutputS3KeyPrefix?: string;
  /** The audio frequency specified in Hz. The valid values for mp3 and ogg_vorbis are "8000", "16000", "22050", and "24000". The default value for standard voices is "22050". The default value for neural v */
  SampleRate?: string;
  /** ARN for the SNS topic optionally used for providing status notification for a speech synthesis task. */
  SnsTopicArn?: string;
  /** The type of speech marks returned for the input text. */
  SpeechMarkTypes?: 'sentence' | 'ssml' | 'viseme' | 'word'[];
  /** Specifies whether the input text is plain text or SSML. The default value is plain text. */
  TextType?: 'ssml' | 'text';
}

export interface SynthesizeSpeechInput {
  /** The format in which the returned output will be encoded. For audio stream, this will be mp3, ogg_vorbis, or pcm. For speech marks, this will be json. When pcm is used, the content returned is audio/pc */
  OutputFormat: 'json' | 'mp3' | 'ogg_opus' | 'ogg_vorbis' | 'pcm';
  /** Input text to synthesize. If you specify ssml as the TextType, follow the SSML format for the input text. */
  Text: string;
  /** Voice ID to use for the synthesis. You can get a list of available voice IDs by calling the DescribeVoices operation. */
  VoiceId: 'Aditi' | 'Amy' | 'Astrid' | 'Bianca' | 'Brian' | 'Camila' | 'Carla' | 'Carmen' | 'Celine' | 'Chantal' | 'Conchita' | 'Cristiano' | 'Dora' | 'Emma' | 'Enrique' | 'Ewa' | 'Filiz' | 'Gabrielle' | 'Geraint' | 'Giorgio' | 'Gwyneth' | 'Hans' | 'Ines' | 'Ivy' | 'Jacek' | 'Jan' | 'Joanna' | 'Joey' | 'Justin' | 'Karl' | 'Kendra' | 'Kevin' | 'Kimberly' | 'Lea' | 'Liv' | 'Lotte' | 'Lucia' | 'Lupe' | 'Mads' | 'Maja' | 'Marlene' | 'Mathieu' | 'Matthew' | 'Maxim' | 'Mia' | 'Miguel' | 'Mizuki' | 'Naja' | 'Nicole' | 'Olivia' | 'Penelope' | 'Raveena' | 'Ricardo' | 'Ruben' | 'Russell' | 'Salli' | 'Seoyeon' | 'Takumi' | 'Tatyana' | 'Vicki' | 'Vitoria' | 'Zeina' | 'Zhiyu' | 'Aria' | 'Ayanda' | 'Arlet' | 'Hannah' | 'Arthur' | 'Daniel' | 'Liam' | 'Pedro' | 'Kajal' | 'Hiujin' | 'Laura' | 'Elin' | 'Ida' | 'Suvi' | 'Ola' | 'Hala' | 'Andres' | 'Sergio' | 'Remi' | 'Adriano' | 'Thiago' | 'Ruth' | 'Stephen' | 'Kazuha' | 'Tomoko' | 'Niamh' | 'Sofie' | 'Lisa' | 'Isabelle' | 'Zayd' | 'Danielle' | 'Gregory' | 'Burcu' | 'Jitka' | 'Sabrina' | 'Jasmine' | 'Jihye';
  /** Specifies the engine (standard, neural, long-form, or generative) for Amazon Polly to use when processing input text for speech synthesis. Provide an engine that is supported by the voice you select.  */
  Engine?: 'standard' | 'neural' | 'long-form' | 'generative';
  /** Optional language code for the Synthesize Speech request. This is only necessary if using a bilingual voice, such as Aditi, which can be used for either Indian English (en-IN) or Hindi (hi-IN). If a b */
  LanguageCode?: 'arb' | 'cmn-CN' | 'cy-GB' | 'da-DK' | 'de-DE' | 'en-AU' | 'en-GB' | 'en-GB-WLS' | 'en-IN' | 'en-US' | 'es-ES' | 'es-MX' | 'es-US' | 'fr-CA' | 'fr-FR' | 'is-IS' | 'it-IT' | 'ja-JP' | 'hi-IN' | 'ko-KR' | 'nb-NO' | 'nl-NL' | 'pl-PL' | 'pt-BR' | 'pt-PT' | 'ro-RO' | 'ru-RU' | 'sv-SE' | 'tr-TR' | 'en-NZ' | 'en-ZA' | 'ca-ES' | 'de-AT' | 'yue-CN' | 'ar-AE' | 'fi-FI' | 'en-IE' | 'nl-BE' | 'fr-BE' | 'cs-CZ' | 'de-CH' | 'en-SG';
  /** List of one or more pronunciation lexicon names you want the service to apply during synthesis. Lexicons are applied only if the language of the lexicon is the same as the language of the voice. For i */
  LexiconNames?: string[];
  /** The audio frequency specified in Hz. The valid values for mp3 and ogg_vorbis are "8000", "16000", "22050", "24000", "44100" and "48000". The default value for standard voices is "22050". The default v */
  SampleRate?: string;
  /** The type of speech marks returned for the input text. */
  SpeechMarkTypes?: 'sentence' | 'ssml' | 'viseme' | 'word'[];
  /** Specifies whether the input text is plain text or SSML. The default value is plain text. For more information, see Using SSML. */
  TextType?: 'ssml' | 'text';
}

/** Polly service binding for Step Functions SDK integrations. */
export class Polly {
  constructor() {}

  deleteLexicon<T>(params: DeleteLexiconInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVoices<T>(params: DescribeVoicesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLexicon<T>(params: GetLexiconInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSpeechSynthesisTask<T>(params: GetSpeechSynthesisTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listLexicons<T>(params: ListLexiconsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSpeechSynthesisTasks<T>(params: ListSpeechSynthesisTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putLexicon<T>(params: PutLexiconInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startSpeechSynthesisTask<T>(params: StartSpeechSynthesisTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  synthesizeSpeech<T>(params: SynthesizeSpeechInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
