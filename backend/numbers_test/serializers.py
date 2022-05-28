from rest_framework import serializers
from .models import NumberModel, Comment

class NumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NumberModel
        exclude = ['id']
        read_only_fields = ['number_of_updates']
    
    # override update method
    def update(self, instance, validated_data):
        # print('in update number within serializers')
        # print(validated_data)
        if "number" in validated_data:
            instance.update_number(validated_data['number'])
        if "test_attr" in validated_data:
            instance.test_attr = validated_data['test_attr']
        instance.save()
        return instance

        # update_fields = [k for k in validated_data]
        # for k, v in validated_data.items():
        #     setattr(instance, k, v)
        
        # instance.save(update_fields=update_fields)
        # return instance

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['pk', 'user', 'title', 'content', 'created', 'updated', 'number']
        read_only_fields = ['pk', 'user', 'created']


    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.number = validated_data.get('number', instance.number)
        instance.save()
        return instance


